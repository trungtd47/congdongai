import test from "node:test";
import assert from "node:assert/strict";
import { nextPushRate, PUSH_LIMIT_HOUR, PUSH_LIMIT_DAY } from "../src/lib/server/push-rate.ts";

const H = 3600e3;

test("cho phép đến hết hạn mức giờ rồi chặn", () => {
  let s;
  for (let i = 0; i < PUSH_LIMIT_HOUR; i++) {
    const r = nextPushRate(s, 1000 + i);
    assert.equal(r.allowed, true);
    s = r.state;
  }
  const blocked = nextPushRate(s, 5000);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.state.hour, PUSH_LIMIT_HOUR); // bị chặn không tăng bộ đếm
});

test("sang giờ mới thì được gửi lại", () => {
  let s;
  for (let i = 0; i < PUSH_LIMIT_HOUR; i++) s = nextPushRate(s, 1000).state;
  const r = nextPushRate(s, 1000 + H + 1);
  assert.equal(r.allowed, true);
  assert.equal(r.state.hour, 1);
});

test("hạn mức ngày chặn dù giờ mới", () => {
  let s;
  let now = 0;
  let sent = 0;
  for (let h = 0; h < 10; h++) {
    for (let i = 0; i < PUSH_LIMIT_HOUR; i++) {
      const r = nextPushRate(s, now + h * H + 1 + i);
      s = r.state;
      if (r.allowed) sent++;
    }
  }
  assert.equal(sent, PUSH_LIMIT_DAY);
});

test("sang ngày mới thì đặt lại", () => {
  let s;
  for (let i = 0; i < 30; i++) s = nextPushRate(s, i).state;
  const r = nextPushRate(s, 25 * H);
  assert.equal(r.allowed, true);
  assert.equal(r.state.day, 1);
});

test("trạng thái trống được phép", () => {
  assert.equal(nextPushRate(undefined, Date.now()).allowed, true);
});
