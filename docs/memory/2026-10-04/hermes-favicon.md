# Favicon Hermes Agent

**Date:** 2026-10-04
**Session:** Sếp thấy favicon AI cũ sau SEO push

## What happened
SEO deploy trước chưa thay src/app/icon.svg: vẫn chữ AI nền gradient. Không phải kết luận cache trước khi kiểm file.

## Decision / Fix / Discovery
Thay icon.svg bằng đúng các path của public/hermes-logo.svg, viewBox24, kích thước32, giữ màu ink. Commit16abfac đã push main; build83/83. Đọc HTML production lấy rel=icon rồi GET đúng URL hash, bytes khớp source mới; không chỉ GET logo public. Không stage việc Friday/auth local ngoài scope.

## Follow-up: nền trắng
Sếp yêu cầu dễ nhìn trên tab tối: thêm rect trắng đặc phủ viewBox, logo có padding2 và giữ path gốc. Commit `a2446f6`, build83/83; rel=icon production và bytes khớp source trắng đã xác minh. Logo header/public không đổi.

## Lesson
Logo public/header và favicon App Router là asset riêng; phải kiểm rel=icon trong HTML và bytes endpoint production sau rollout.
