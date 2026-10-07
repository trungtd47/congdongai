"""Verify editorial B release without changing data or authenticating users."""
import hashlib
import json
import sys
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

root = Path(__file__).resolve().parents[1]
protected = json.loads((root / 'docs/design/protected-baseline.json').read_text())
changed = [name for name, digest in protected.items() if not (root/name).exists() or hashlib.sha256((root/name).read_bytes()).hexdigest() != digest]
assert not changed, f'Protected source changed: {changed}'
print(json.dumps({'protected_files_unchanged': len(protected)}))

if len(sys.argv) == 1:
    sys.exit(0)
base = sys.argv[1].rstrip('/')
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.hrefs = []
        self.anchor_depth = 0
        self.nested_links = False
        self.in_script = False
        self.text = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if tag == 'script' or tag == 'style': self.in_script = True
        if tag == 'a':
            if self.anchor_depth: self.nested_links = True
            self.anchor_depth += 1
            self.hrefs.append(attrs.get('href', ''))
    def handle_endtag(self, tag):
        if tag == 'a': self.anchor_depth = max(0, self.anchor_depth-1)
        if tag == 'script' or tag == 'style': self.in_script = False
    def handle_data(self, data):
        if not self.in_script: self.text.append(data)

def get(path):
    url = base + urllib.parse.quote(path, safe='/%?=&')
    with urllib.request.urlopen(url, timeout=25) as r:
        assert r.status == 200, url
        return r.read().decode()

sitemap = ET.fromstring(get('/sitemap.xml'))
urls = [e.text for e in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls) == len(set(urls)) == 109, len(urls)
results = []
for url in urls:
    path = urllib.parse.urlsplit(url).path
    html = get(path)
    p = Page(); p.feed(html)
    assert p.h1 == 1, (path, p.h1)
    assert not p.nested_links, path
    assert 'BẢN XEM TRƯỚC' not in html and 'data-dialog="contribute"' not in html, path
    results.append(path)
    if path == '/':
        text = ' '.join(p.text)
        assert 'Một chỗ để hỏi.' in text and 'chia sẻ.' in text, 'B headline missing'
        assert 'Đức Trung' in text
        assert '/hoi-dap/tao/' in p.hrefs and '/cau-chuyen/kinh-nghiem-ban-tin-6h30/' in p.hrefs
        assert '/illustrations/community-morning.svg' in html
        assert 'Mình bắt đầu với OpenClaw' in text, 'Original letter missing'
        assert 'Người ngày nào cũng đang dùng Hermes' in text
get('/illustrations/community-morning.svg')
print(json.dumps({'base': base, 'sitemap_pages_verified': len(results), 'tag_pages': sum('/tag/' in p for p in results), 'protected_files_unchanged': len(protected), 'nested_links': False, 'home_B': True}, ensure_ascii=False))
