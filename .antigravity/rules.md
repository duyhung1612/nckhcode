# Mandatory Frontend UI Standards & Design Rules

Trước khi render hoặc sửa đổi bất kỳ giao diện nào của dự án, Antigravity BẮT BUỘC phải đối chiếu các tiêu chí sau:

1. Zero Horizontal Overflow:
   - Tuyệt đối không để lộ thanh cuộn ngang (horizontal scrollbar) mặc định của trình duyệt trên thanh Navbar, Menu Tabs hoặc Viewport Desktop.
   - Nếu danh sách Tabs dài, phải dùng custom scroll container ẩn scrollbar (`scrollbar-none`, `no-scrollbar`), hiển thị nút mũi tên trượt (carousel scroll) hoặc gom vào submenu dropdown.

2. Strict LaTeX & Formula Rendering:
   - Khi giao diện có chứa ký hiệu toán học hoặc công thức ($...$, $$...$$), phải đảm bảo component đã tích hợp engine render KaTeX/MathJax.
   - Nếu không tích hợp KaTeX, tuyệt đối không render chuỗi ký tự raw ($C(s)$, $R(s) = 70\%$) ra DOM mà phải format dạng văn bản thông thường rõ nghĩa.

3. Typography & Hierarchy for Badges/Labels:
   - Các nhãn định danh vai trò (Role tags như "Sinh viên", "Giảng viên") không được để tự động bẻ dòng gây vỡ khối text. Phải dùng `white-space: nowrap`, kèm style Badge/Pill rõ ràng.

4. Consistent Dark Theme Tokens:
   - Đảm bảo độ tương phản (WCAG AA): Text phụ phải đủ độ sáng trên nền dark slate/navy.
   - Các nút Toggle View (như chọn Biểu đồ / DAG) phải được đặt cùng cấp với Card Header của biểu đồ tương ứng.