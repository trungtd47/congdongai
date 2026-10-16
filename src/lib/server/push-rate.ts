// Giới hạn số thông báo đẩy mỗi người nhận để không bị dồn (thuần hàm, có test).
export const PUSH_LIMIT_HOUR = 6;
export const PUSH_LIMIT_DAY = 20;
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export interface PushRateState {
  hourStart: number;
  hour: number;
  dayStart: number;
  day: number;
}

export function nextPushRate(
  prev: Partial<PushRateState> | undefined,
  now: number,
): { allowed: boolean; state: PushRateState } {
  let hourStart = prev?.hourStart ?? 0;
  let hour = prev?.hour ?? 0;
  let dayStart = prev?.dayStart ?? 0;
  let day = prev?.day ?? 0;
  if (now - hourStart >= HOUR) {
    hourStart = now;
    hour = 0;
  }
  if (now - dayStart >= DAY) {
    dayStart = now;
    day = 0;
  }
  if (hour >= PUSH_LIMIT_HOUR || day >= PUSH_LIMIT_DAY)
    return { allowed: false, state: { hourStart, hour, dayStart, day } };
  return {
    allowed: true,
    state: { hourStart, hour: hour + 1, dayStart, day: day + 1 },
  };
}
