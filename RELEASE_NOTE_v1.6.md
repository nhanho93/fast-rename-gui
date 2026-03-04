# 🚀 Fast Image Siêu Cấp VIP PRO — Release v1.6.0

**Ngày phát hành:** 04/03/2026
**Nền tảng:** Windows (Portable — không cần cài đặt)
**Kích thước:** ~86 MB

---

## 🎉 Điểm nổi bật của phiên bản này

### 🌐 Favicon SEO Pack (Tính năng mới)
- Tích hợp công cụ tự động tạo bộ cấu trúc thư mục Favicon chuẩn SEO từ hình ảnh logo gốc.
- Tự động xuất ra một thư mục `[tên-logo]-favicon/` chứa đầy đủ các kích thước chuẩn (ICO, PNG 16x16, 32x32, 192x192, 512x512) và file `site.webmanifest` để dễ dàng khai báo website.

### 🌍 Giao diện Song ngữ Anh / Việt
- Hỗ trợ đầy đủ ngôn ngữ Anh / Việt cho toàn bộ thành phần giao diện (nút bấm, bảng, công cụ, tooltip, thông báo hệ thống và modal).
- Ngôn ngữ được tự động lưu phiên làm việc qua hệ thống `localStorage`.

### ✨ Hỗ trợ Font chuẩn Tiếng Việt
- Khắc phục các lỗi hiển thị ký tự (đặc biệt là các chữ ă, ử, ữ, ự bị lệch hoặc dùng font fallback) bằng cách thay thế bộ phông `Outfit` thành `Be Vietnam Pro` thiết kế riêng cho ngôn ngữ Tiếng Việt dạng hình khối hiện đại (geometric).

### 📖 Nhật ký cập nhật thông minh (Changelog Auto-Collapse)
- Bảng nhật ký thay đổi của ứng dụng được thiết kế lại gọn gàng, sử dụng HTML5 `<details>` và `<summary>`. Phiên bản gần nhất (`LATEST`) sẽ luôn được mở ra, còn lại sẽ tự động gập gọn lại.

---

## 🐛 Lỗi đã sửa

- Sửa lỗi UI nghiêm trọng khiến Tooltip (`data-info`) bị tràn mép màn hình khi hover gần rìa, được fix bằng hệ thống đo padding JavaScript theo thời gian thực (bounding rect).
- Sửa lỗi nội dung phần Modal Changelog bị tràn dài và mất chữ (overflow) do flex container không cho phép cuộn nội dung con.

---

## ⬇️ Tải về

| File | Mô tả |
|------|-------|
| `Fast Image Siêu Cấp VIP PRO 1.6.0.exe` | Portable — chạy thẳng, không cài đặt |

> **Yêu cầu hệ thống:** Windows 10/11 (64-bit)

---

*Phiên bản trước: [v1.5.0](CHANGELOG.md#150--2026-03-04)*
