import test from "node:test";
import assert from "node:assert/strict";
import { isAllowedPushEndpoint as ok } from "../src/lib/server/push-endpoint.ts";

test("nhận endpoint của push service thật", () => {
  assert.equal(ok("https://fcm.googleapis.com/fcm/send/abc"), true);
  assert.equal(ok("https://updates.push.services.mozilla.com/wpush/v2/abc"), true);
  assert.equal(ok("https://web.push.apple.com/QAbc"), true);
  assert.equal(ok("https://wns2-par02p.notify.windows.com/w/?token=abc"), true);
});

test("từ chối địa chỉ lạ, http, cổng, đánh lừa tên miền", () => {
  for (const u of [
    "http://fcm.googleapis.com/x",
    "https://127.0.0.1/x",
    "https://localhost/x",
    "https://169.254.169.254/latest",
    "https://evil.com/fcm.googleapis.com",
    "https://fcm.googleapis.com.evil.com/x",
    "https://evilfcm.googleapis.com.attacker.io/x",
    "https://fcm.googleapis.com:8443/x",
    "https://user:pw@fcm.googleapis.com/x",
    "not a url",
    "",
  ])
    assert.equal(ok(u), false, u);
});
