"""Verify CongDongAI SEO output against a running local or production site.

Usage: python scripts/verify-seo.py --base-url http://127.0.0.1:3404
Checks only public HTTP data. Never requires credentials or writes remotely.
"""
from __future__ import annotations
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

CANONICAL_ORIGIN = 'https://congdongai.org'


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title = ''
        self.meta: dict[str, str] = {}
        self.canonicals: list[str] = []
        self.schemas: list[dict] = []
        self.h1_count = 0
        self._title = False
        self._json = False
        self._json_text = ''

    def handle_starttag(self, tag: str, attrs: list) -> None:
        data = dict(attrs)
        if tag == 'title':
            self._title = True
        if tag == 'h1':
            self.h1_count += 1
        if tag == 'meta':
            key = data.get('name') or data.get('property')
            if key:
                self.meta[key] = data.get('content', '')
        if tag == 'link' and data.get('rel') == 'canonical':
            self.canonicals.append(data.get('href', ''))
        if tag == 'script' and data.get('type') == 'application/ld+json':
            self._json = True
            self._json_text = ''

    def handle_endtag(self, tag: str) -> None:
        if tag == 'title':
            self._title = False
        if tag == 'script' and self._json:
            self.schemas.append(json.loads(self._json_text))
            self._json = False

    def handle_data(self, value: str) -> None:
        if self._title:
            self.title += value
        if self._json:
            self._json_text += value


def fetch(base: str, path: str) -> dict:
    request = Request(base.rstrip('/') + path,
                      headers={'User-Agent': 'CongDongAI-SEO-Verification/1.0'})
    try:
        with urlopen(request, timeout=30) as response:
            raw = response.read()
            return {'path': path, 'status': response.status,
                    'url': response.url, 'headers': dict(response.headers),
                    'raw': raw}
    except HTTPError as error:
        return {'path': path, 'status': error.code, 'error': str(error)}
    except (URLError, TimeoutError) as error:
        return {'path': path, 'status': 0, 'error': str(error)}


def verify(base: str) -> dict:
    errors: list[str] = []
    sitemap_response = fetch(base, '/sitemap.xml')
    if sitemap_response['status'] != 200:
        return {'errors': ['Sitemap not reachable'], 'responses': []}
    root = ET.fromstring(sitemap_response['raw'])
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = [item.text for item in root.findall('s:url/s:loc', ns)]
    if len(urls) != len(set(urls)):
        errors.append('Duplicate sitemap URLs')
    for url in urls:
        if not url or not url.startswith(CANONICAL_ORIGIN + '/'):
            errors.append(f'Wrong sitemap origin: {url}')
        if not url or not url.endswith('/'):
            errors.append(f'Canonical slash missing: {url}')
        if url and ('/quan-tri/' in url or '/api/' in url
                    or '/hoi-dap/p-' in url or '/hoi-dap/tao/' in url):
            errors.append(f'Non-editorial route in sitemap: {url}')
    paths = [urlsplit(url).path for url in urls if url]
    with ThreadPoolExecutor(max_workers=8) as pool:
        responses = list(pool.map(lambda p: fetch(base, p), paths))
    results: list[dict] = []
    titles: dict[str, str] = {}
    for response in responses:
        path = response['path']
        result = {'path': path, 'status': response['status']}
        if response['status'] != 200:
            errors.append(f'{path}: HTTP {response["status"]}')
            results.append(result)
            continue
        page = Page()
        try:
            page.feed(response['raw'].decode('utf-8'))
        except (ValueError, UnicodeDecodeError) as error:
            errors.append(f'{path}: invalid HTML/JSON-LD: {error}')
            results.append(result)
            continue
        result.update(title=page.title, canonical=page.canonicals,
                      robots=page.meta.get('robots'), h1=page.h1_count)
        if page.canonicals != [CANONICAL_ORIGIN + path]:
            errors.append(f'{path}: canonical mismatch')
        if 'noindex' in page.meta.get('robots', '').lower():
            errors.append(f'{path}: unexpected noindex')
        xrobots = {k.lower(): v for k, v in response['headers'].items()}
        if 'noindex' in xrobots.get('x-robots-tag', '').lower():
            errors.append(f'{path}: unexpected X-Robots-Tag')
        if not page.title or not page.meta.get('description'):
            errors.append(f'{path}: missing title/description')
        if page.title in titles:
            errors.append(f'{path}: duplicate title with {titles[page.title]}')
        titles[page.title] = path
        for schema in page.schemas:
            if schema.get('@type') == 'BreadcrumbList':
                for item in schema.get('itemListElement', []):
                    item_url = item.get('item', '')
                    if not item_url.startswith(CANONICAL_ORIGIN + '/') or not item_url.endswith('/'):
                        errors.append(f'{path}: breadcrumb URL mismatch')
            if schema.get('@type') == 'Article':
                if schema.get('url') != CANONICAL_ORIGIN + path:
                    errors.append(f'{path}: article schema URL mismatch')
        results.append(result)
    by_path = {r['path']: r for r in responses}
    # Shared metadata was repaired for these hubs and article templates.
    primary = ['/', '/bat-dau/', '/huong-dan/', '/lo-trinh/',
               '/bat-dau/hermes-agent-la-gi/',
               '/bat-dau/vi-sao-dung-openrouter/']
    for path in primary:
        response = by_path.get(path)
        if not response or response['status'] != 200:
            errors.append(f'{path}: primary page missing')
            continue
        page = Page()
        page.feed(response['raw'].decode('utf-8'))
        if page.h1_count != 1:
            errors.append(f'{path}: expected one visible H1')
        for key in ['og:title', 'og:description', 'twitter:title', 'twitter:description']:
            if not page.meta.get(key):
                errors.append(f'{path}: missing {key}')
        if page.meta.get('og:title') != page.meta.get('twitter:title'):
            errors.append(f'{path}: OG/Twitter title mismatch')
        if page.meta.get('og:description') != page.meta.get('description'):
            errors.append(f'{path}: OG description mismatch')
        if page.meta.get('twitter:description') != page.meta.get('description'):
            errors.append(f'{path}: Twitter description mismatch')
        if page.meta.get('og:image') != CANONICAL_ORIGIN + '/og.png':
            errors.append(f'{path}: missing real sharing image')
    if '/bat-dau/vi-sao-dung-openrouter/' not in paths:
        errors.append('Static OpenRouter route missing from sitemap')
    for path in ['/blog/hermes-agent-la-gi/', '/cau-chuyen/devto-7-agents/']:
        response = fetch(base, path)
        if response['status'] != 404:
            errors.append(f'{path}: removed page should return 404')
    admin = fetch(base, '/quan-tri/friday/')
    if admin['status'] == 200:
        page = Page()
        page.feed(admin['raw'].decode('utf-8'))
        if 'noindex' not in page.meta.get('robots', '').lower():
            errors.append('Admin page lost noindex')
    else:
        errors.append('Admin noindex could not be verified')
    image = fetch(base, '/og.png')
    if image['status'] != 200 or not image.get('raw', b'').startswith(b'\x89PNG\r\n\x1a\n'):
        errors.append('Sharing image missing or not PNG')
    robots = fetch(base, '/robots.txt')
    robots_body = robots.get('raw', b'').decode('utf-8')
    if robots['status'] != 200 or 'Sitemap: https://congdongai.org/sitemap.xml' not in robots_body:
        errors.append('Robots missing sitemap declaration')
    if '\nDisallow: /\n' in robots_body:
        errors.append('Robots blocks entire site')
    return {'base': base, 'sitemap_count': len(urls), 'verified_pages': len(results),
            'errors': errors, 'responses': results}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--base-url', default='http://127.0.0.1:3404')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    report = verify(args.base_url)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({k: v for k, v in report.items() if k != 'responses'}, ensure_ascii=False, indent=2))
    raise SystemExit(1 if report['errors'] else 0)
