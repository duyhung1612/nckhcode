---
name: git-auto-sync
description: Sau khi làm xong một việc có thay đổi code trong repo Git, kiểm tra build rồi commit và push lên GitHub ở nhánh hiện tại. Dùng khi task vừa xong và có file thay đổi. Pull code mới chỉ làm lúc bắt đầu làm việc, không tự pull sau khi xong việc.
---

# Git Auto Sync

Skill này giữ cho code trên GitHub luôn mới nhất sau mỗi task, và lấy code mới nhất về trước khi bắt đầu làm.

## Khi nào dùng skill này

- Sau khi hoàn thành một task làm thay đổi file trong repo Git (sửa code, thêm file, sửa UI).
- Trước khi bắt đầu task mới: pull code mới nhất về, chỉ khi cây làm việc đang sạch.

## Sau khi xong việc: kiểm tra rồi push

- Chạy lệnh kiểm tra của project trước (ví dụ `npm run build`; project không có build thì bỏ qua). Build lỗi thì dừng lại, báo lỗi cho người dùng, không commit, không push.
- Chạy `git status` và `git branch --show-current` để xem file nào đổi và đang ở nhánh nào. Chỉ commit file liên quan tới task vừa làm. Không commit file rác, file tạm, file log, file chứa secret (.env, token, key, mật khẩu).
- Commit bằng message ngắn gọn, mô tả đúng thay đổi, theo kiểu message sẵn có trong repo (ví dụ "fix mode sáng tối", "update ui sua trang").
- Chạy `git push` lên đúng nhánh hiện tại. Không dùng `git push --force` trong bất kỳ trường hợp nào. Không push sang nhánh khác.
- Báo lại cho người dùng: đã commit những gì, push lên nhánh nào, có lỗi gì không. Nếu push lỗi (mất mạng, bị từ chối, repo đã có commit mới) thì dừng lại và báo, không tự xử lý.

## Trước khi bắt đầu làm: pull code mới

- Chỉ pull lúc bắt đầu một phiên làm việc, trước khi sửa code. Không tự pull sau khi xong việc.
- Chạy `git status` trước: cây làm việc phải sạch (không còn thay đổi chưa commit). Nếu còn thay đổi chưa commit thì dừng lại, hỏi người dùng trước khi pull.
- Chạy `git pull` để lấy code mới nhất (ví dụ code đồng đội vừa merge). Nếu pull báo conflict thì dừng ngay, báo cho người dùng, không tự merge, không tự chọn giữ bản nào.

## Không bao giờ làm

- Không `git push --force`, không `--force-with-lease` khi chưa được người dùng đồng ý rõ ràng cho đúng nhánh đó.
- Không tự giải quyết merge conflict.
- Không commit hay push file chứa secret, key, token, mật khẩu.
- Không push khi build đang lỗi.
- Không pull đè lên thay đổi chưa commit.
