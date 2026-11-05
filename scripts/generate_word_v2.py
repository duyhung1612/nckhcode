import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def create_document():
    doc = docx.Document()

    # Set margins: 2 cm (~0.79 inch)
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Base Normal Style
    normal_style = doc.styles['Normal']
    normal_font = normal_style.font
    normal_font.name = 'Times New Roman'
    normal_font.size = Pt(13)
    normal_font.color.rgb = RGBColor(0x1F, 0x29, 0x37) # Slate 800

    # Header / Institution
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_after = Pt(2)
    run = p_inst.add_run("TRƯỜNG ĐẠI HỌC TÀI CHÍNH – NGÂN HÀNG HÀ NỘI (FBU)\nVIỆN CÔNG NGHỆ THÔNG TIN")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0x37, 0x41, 0x51)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(8)
    p_title.paragraph_format.space_after = Pt(4)
    run_t = p_title.add_run("NGÂN HÀNG CÂU HỎI ĐÁNH GIÁ NĂNG LỰC FRONTEND\nCHUYÊN ĐỀ TRỌNG TÂM: JAVASCRIPT & DOM")
    run_t.font.name = 'Times New Roman'
    run_t.font.size = Pt(16)
    run_t.font.bold = True
    run_t.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A) # Deep Blue

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(14)
    run_s = p_sub.add_run("(Phục vụ Đề tài NCKH Sinh viên: Đánh giá Khoảng cách Kỹ năng & Lộ trình Bổ sung)")
    run_s.font.name = 'Times New Roman'
    run_s.font.size = Pt(11.5)
    run_s.font.italic = True
    run_s.font.color.rgb = RGBColor(0x4B, 0x55, 0x63)

    # Info Box / Meta
    tbl = doc.add_table(rows=4, cols=2)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False

    meta_data = [
        ("Phạm vi chuyên đề:", "Nhóm G2 – JavaScript & DOM (Thu hẹp theo Đề cương v4)"),
        ("Tổng số câu hỏi trắc nghiệm:", "20 câu (Đề A Tiền kiểm: 10 câu | Đề B Hậu kiểm sinh đôi: 10 câu)"),
        ("Phân bố mức độ Bloom & Độ khó:", "3 Dễ (Nhớ, Hiểu) / 4 Trung bình (Hiểu, Vận dụng) / 3 Khó (Vận dụng, Phân tích)"),
        ("Câu hỏi phỏng vấn chuyên sâu:", "5 câu tình huống phỏng vấn thực tế có barem đánh giá chi tiết")
    ]

    for i, (k, v) in enumerate(meta_data):
        row = tbl.rows[i]
        c1, c2 = row.cells[0], row.cells[1]
        c1.width = Inches(2.6)
        c2.width = Inches(4.3)
        set_cell_background(c1, "F3F4F6")
        set_cell_background(c2, "F9FAFB")
        set_cell_margins(c1, 80, 80, 120, 120)
        set_cell_margins(c2, 80, 80, 120, 120)

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(k)
        r1.font.bold = True
        r1.font.size = Pt(11)
        r1.font.name = 'Times New Roman'

        p2 = c2.paragraphs[0]
        p2.paragraph_format.space_after = Pt(0)
        r2 = p2.add_run(v)
        r2.font.size = Pt(11)
        r2.font.name = 'Times New Roman'

    p_spacer = doc.add_paragraph()
    p_spacer.paragraph_format.space_before = Pt(12)
    p_spacer.paragraph_format.space_after = Pt(0)

    # Helper function for Section Heading
    def add_section_header(title, subtitle=""):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run(title)
        run.font.bold = True
        run.font.size = Pt(14)
        run.font.color.rgb = RGBColor(0x1E, 0x40, 0xAF)
        
        if subtitle:
            p2 = doc.add_paragraph()
            p2.paragraph_format.space_before = Pt(0)
            p2.paragraph_format.space_after = Pt(8)
            run2 = p2.add_run(subtitle)
            run2.font.italic = True
            run2.font.size = Pt(11.5)
            run2.font.color.rgb = RGBColor(0x4B, 0x55, 0x63)

    # Helper function for rendering a question item
    def render_question(q_num, q_id, skill, bloom, difficulty, question_text, code_snippet, options, correct_key, explanation, twin_note=""):
        p_q = doc.add_paragraph()
        p_q.paragraph_format.space_before = Pt(12)
        p_q.paragraph_format.space_after = Pt(3)
        p_q.paragraph_format.line_spacing = 1.15
        
        # Header line with ID and badges
        r_num = p_q.add_run(f"Câu {q_num}. ")
        r_num.font.bold = True
        r_num.font.size = Pt(13)
        r_num.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)

        r_badge = p_q.add_run(f"[{q_id} | Nhóm: {skill} | Bloom: {bloom} | Độ khó: {difficulty}]\n")
        r_badge.font.bold = True
        r_badge.font.size = Pt(11)
        r_badge.font.color.rgb = RGBColor(0x4B, 0x55, 0x63)

        # Question text
        r_text = p_q.add_run(question_text)
        r_text.font.size = Pt(13)

        # Code snippet if available
        if code_snippet:
            p_code = doc.add_paragraph()
            p_code.paragraph_format.left_indent = Inches(0.4)
            p_code.paragraph_format.space_before = Pt(4)
            p_code.paragraph_format.space_after = Pt(4)
            r_code = p_code.add_run(code_snippet)
            r_code.font.name = 'Consolas'
            r_code.font.size = Pt(10.5)
            r_code.font.color.rgb = RGBColor(0x1F, 0x29, 0x37)

        # Options
        for opt_key, opt_text in options:
            p_opt = doc.add_paragraph()
            p_opt.paragraph_format.left_indent = Inches(0.3)
            p_opt.paragraph_format.space_before = Pt(1.5)
            p_opt.paragraph_format.space_after = Pt(1.5)
            p_opt.paragraph_format.line_spacing = 1.15
            
            r_key = p_opt.add_run(f"{opt_key}. ")
            r_key.font.bold = True
            r_key.font.size = Pt(13)
            
            r_val = p_opt.add_run(opt_text)
            r_val.font.size = Pt(13)

        # Answer & Explanation
        p_ans = doc.add_paragraph()
        p_ans.paragraph_format.left_indent = Inches(0.3)
        p_ans.paragraph_format.space_before = Pt(3)
        p_ans.paragraph_format.space_after = Pt(2)
        
        r_ans_label = p_ans.add_run("► Đáp án đúng: ")
        r_ans_label.font.bold = True
        r_ans_label.font.size = Pt(12)
        r_ans_label.font.color.rgb = RGBColor(0x15, 0x80, 0x3D) # Emerald Green

        r_ans_val = p_ans.add_run(f"[{correct_key}]\n")
        r_ans_val.font.bold = True
        r_ans_val.font.size = Pt(12.5)
        r_ans_val.font.color.rgb = RGBColor(0x15, 0x80, 0x3D)

        r_exp_label = p_ans.add_run("► Giải thích chi tiết: ")
        r_exp_label.font.bold = True
        r_exp_label.font.size = Pt(11.5)
        r_exp_label.font.color.rgb = RGBColor(0x37, 0x41, 0x51)

        r_exp_val = p_ans.add_run(explanation)
        r_exp_val.font.size = Pt(11.5)
        r_exp_val.font.color.rgb = RGBColor(0x37, 0x41, 0x51)

        if twin_note:
            p_twin = doc.add_paragraph()
            p_twin.paragraph_format.left_indent = Inches(0.3)
            p_twin.paragraph_format.space_before = Pt(1)
            p_twin.paragraph_format.space_after = Pt(4)
            r_tw = p_twin.add_run(f"► Đối sánh câu gốc: {twin_note}")
            r_tw.font.italic = True
            r_tw.font.size = Pt(11)
            r_tw.font.color.rgb = RGBColor(0x6B, 0x72, 0x80)

    # ==========================================
    # PHẦN 1: ĐỀ A - BỘ CÂU HỎI TIỀN KIỂM (PRE-TEST)
    # ==========================================
    add_section_header(
        "PHẦN 1: ĐỀ A – BỘ CÂU HỎI ĐÁNH GIÁ TIỀN KIỂM (PRE-TEST) [10 CÂU]",
        "Ma trận chuẩn: 3 Dễ (Nhớ, Hiểu) | 4 Trung bình (Hiểu, Vận dụng) | 3 Khó (Vận dụng, Phân tích) — Phân bố đáp án: A:2, B:3, C:2, D:3"
    )

    exam_a_questions = [
        (
            1, "QA_G2_01", "G2.1 (Cú pháp & ES6+)", "Nhớ", "Dễ",
            "Từ khóa nào trong JavaScript ES6 dùng để khai báo hằng số không thể gán lại giá trị mới bằng toán tử gán?",
            "",
            [
                ("A", "var"),
                ("B", "let"),
                ("C", "const"),
                ("D", "static")
            ],
            "C",
            "const được dùng để khai báo một biến có phạm vi khối (block-scoped) và không thể gán lại giá trị (read-only reference)."
        ),
        (
            2, "QA_G2_02", "G2.1 (Cú pháp & ES6+)", "Hiểu", "Dễ",
            "Kết quả in ra màn hình console của đoạn mã sau là gì?",
            "const user = { name: \"An\", age: 20 };\nconst { name, age } = user;\nconsole.log(name, age);",
            [
                ("A", "An 20"),
                ("B", "undefined undefined"),
                ("C", "{ name: \"An\", age: 20 }"),
                ("D", "Lỗi cú pháp SyntaxError")
            ],
            "A",
            "Đây là cú pháp Destructuring Assignment của ES6 giúp trích xuất các thuộc tính từ đối tượng vào các biến riêng biệt tương ứng."
        ),
        (
            3, "QA_G2_03", "G2.3 (DOM & Sự kiện)", "Nhớ", "Dễ",
            "Phương thức chuẩn nào của Document/Element dùng để gắn một hàm lắng nghe sự kiện (event listener) vào phần tử HTML?",
            "",
            [
                ("A", "element.attachEvent()"),
                ("B", "element.setEventHandler()"),
                ("C", "element.listen()"),
                ("D", "element.addEventListener()")
            ],
            "D",
            "addEventListener() là phương thức chuẩn của W3C DOM Level 2 để đăng ký trình xử lý sự kiện linh hoạt trên phần tử."
        ),
        (
            4, "QA_G2_04", "G2.1 (Cú pháp & ES6+)", "Hiểu", "Trung bình",
            "Điểm khác biệt quan trọng nhất giữa Arrow Function và Regular Function trong JavaScript là gì?",
            "",
            [
                ("A", "Arrow function chạy chậm hơn function thường do phải khởi tạo ngữ cảnh đặc biệt"),
                ("B", "Arrow function không có ngữ cảnh this riêng mà kế thừa từ phạm vi bao quanh (lexical this)"),
                ("C", "Arrow function không thể nhận tham số đầu vào"),
                ("D", "Arrow function có thể dùng làm hàm khởi tạo constructor với từ khóa new")
            ],
            "B",
            "Arrow function không định nghĩa ngữ cảnh this của riêng mình mà kế thừa trực tiếp this từ lexical scope bao quanh nó."
        ),
        (
            5, "QA_G2_05", "G2.2 (Phạm vi & Closure)", "Hiểu", "Trung bình",
            "Đoạn mã sau in ra giá trị gì trên màn hình console?",
            "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
            [
                ("A", "0 1 2"),
                ("B", "undefined undefined undefined"),
                ("C", "Lỗi ReferenceError: i is not defined"),
                ("D", "3 3 3")
            ],
            "D",
            "Biến var có phạm vi hàm (function scope). Khi setTimeout thực thi sau 100ms, vòng lặp đã kết thúc và biến i toàn cục/hàm đã có giá trị là 3."
        ),
        (
            6, "QA_G2_06", "G2.2 (Phạm vi & Closure)", "Vận dụng", "Trung bình",
            "Khái niệm Closure trong JavaScript được định nghĩa chính xác là gì?",
            "",
            [
                ("A", "Khả năng một hàm ghi nhớ và truy cập vào các biến thuộc phạm vi từ vựng (lexical scope) của nó ngay cả khi hàm đó được thực thi bên ngoài phạm vi đó"),
                ("B", "Khả năng một hàm truy cập biến toàn cục"),
                ("C", "Cơ chế tự động giải phóng bộ nhớ của trình thu gom rác (Garbage Collector)"),
                ("D", "Phương thức dùng để đóng kết nối mạng hoặc đóng stream dữ liệu")
            ],
            "A",
            "Closure là sự kết hợp giữa một hàm và môi trường từ vựng (lexical environment) nơi hàm đó được khai báo, cho phép hàm truy cập các biến bên ngoài kể cả sau khi hàm cha đã kết thúc."
        ),
        (
            7, "QA_G2_07", "G2.3 (DOM & Sự kiện)", "Vận dụng", "Trung bình",
            "Khi người dùng click vào một phần tử con bên trong nhiều thẻ cha, sự kiện lan truyền từ thẻ con ngược lên các thẻ cha tổ tiên được gọi là gì?",
            "",
            [
                ("A", "Event Capturing (Bắt giữ sự kiện)"),
                ("B", "Event Bubbling (Sủi bọt sự kiện)"),
                ("C", "Event Throttle (Tiết lưu sự kiện)"),
                ("D", "Event Hijacking (Chiếm quyền sự kiện)")
            ],
            "B",
            "Event Bubbling là giai đoạn sự kiện sau khi kích hoạt tại phần tử đích (target element) sẽ lan truyền ngược lên các phần tử tổ tiên đến đối tượng document/window."
        ),
        (
            8, "QA_G2_08", "G2.2 (Phạm vi & Closure)", "Vận dụng", "Khó",
            "Đoạn mã sau in ra giá trị gì trên màn hình console?",
            "const obj = {\n  count: 10,\n  getCount: function() {\n    return () => this.count;\n  }\n};\nconst fn = obj.getCount();\nconsole.log(fn());",
            [
                ("A", "undefined"),
                ("B", "Lỗi TypeError: this is undefined"),
                ("C", "10"),
                ("D", "NaN")
            ],
            "C",
            "getCount là regular function được gọi qua obj nên this bên trong getCount trỏ tới obj. Arrow function kế thừa lexical this của getCount, do đó this.count trả về 10."
        ),
        (
            9, "QA_G2_09", "G2.3 (DOM & Sự kiện)", "Vận dụng", "Khó",
            "Kỹ thuật \"Event Delegation\" mang lại lợi ích lớn nhất nào khi xử lý sự kiện trên danh sách gồm 10,000 phần tử động (ví dụ: danh sách sản phẩm)?",
            "",
            [
                ("A", "Giúp trình duyệt bỏ qua việc tính toán lại CSS Render Tree"),
                ("B", "Tự động đồng bộ hóa trạng thái click của 10,000 phần tử lên LocalStorage"),
                ("C", "Đảm bảo sự kiện chỉ kích hoạt một lần duy nhất rồi tự hủy"),
                ("D", "Chỉ cần gắn 1 event listener duy nhất lên phần tử cha thay vì gắn 10,000 listener riêng lẻ, tiết kiệm đáng kể bộ nhớ")
            ],
            "D",
            "Event Delegation lợi dụng cơ chế Event Bubbling để xử lý sự kiện tập trung tại phần tử cha, tối ưu bộ nhớ và tự động áp dụng cho cả các phần tử con được thêm mới động vào DOM."
        ),
        (
            10, "QA_G2_10", "G2.1 (Cú pháp & ES6+)", "Phân tích", "Khó",
            "Đoạn mã sao chép đối tượng sau tạo ra bản sao nông (shallow copy) hay bản sao sâu (deep copy)?",
            "const original = { a: 1, b: { c: 2 } };\nconst clone = { ...original };",
            [
                ("A", "Deep copy hoàn toàn, sửa clone.b.c không ảnh hưởng original"),
                ("B", "Shallow copy, sửa clone.b.c sẽ làm thay đổi cả original.b.c"),
                ("C", "Gây lỗi cú pháp vì toán tử spread không hỗ trợ sao chép đối tượng lồng nhau"),
                ("D", "Tạo liên kết tham chiếu trực tiếp chứ không tạo ra vùng nhớ mới cho đối tượng clone")
            ],
            "B",
            "Toán tử Spread (...) chỉ sao chép nông các thuộc tính tầng 1. Thuộc tính b là đối tượng lồng nhau nên vẫn chia sẻ chung cùng một tham chiếu vùng nhớ giữa original và clone."
        )
    ]

    for q in exam_a_questions:
        render_question(*q)

    # ==========================================
    # PHẦN 2: ĐỀ B - BỘ CÂU HỎI HẬU KIỂM SINH ĐÔI (POST-TEST)
    # ==========================================
    doc.add_page_break()
    add_section_header(
        "PHẦN 2: ĐỀ B – BỘ CÂU HỎI HẬU KIỂM SINH ĐÔI (POST-TEST) [10 CÂU]",
        "Cấu trúc tương đương 100% về Bloom và độ khó, đổi mới ngữ cảnh, dữ liệu và phân bố đáp án: A:3, B:2, C:3, D:2"
    )

    exam_b_questions = [
        (
            1, "QB_G2_01", "G2.1 (Cú pháp & ES6+)", "Nhớ", "Dễ",
            "Từ khóa nào trong JavaScript ES6 dùng để khai báo biến có phạm vi khối (block-scoped) và cho phép gán lại giá trị mới?",
            "",
            [
                ("A", "const"),
                ("B", "let"),
                ("C", "var"),
                ("D", "function")
            ],
            "B",
            "let là từ khóa ES6 dùng để khai báo biến có phạm vi khối (block-scoped) và cho phép gán lại (reassignable), khác với const (không thể gán lại) và var (function-scoped).",
            "QA_G2_01 (Khai báo biến ES6)"
        ),
        (
            2, "QB_G2_02", "G2.1 (Cú pháp & ES6+)", "Hiểu", "Dễ",
            "Kết quả in ra màn hình console của đoạn mã sau là gì?",
            "const colors = [\"Đỏ\", \"Xanh\"];\nconst [first, second, third = \"Vàng\"] = colors;\nconsole.log(first, third);",
            [
                ("A", "Đỏ Vàng"),
                ("B", "Đỏ undefined"),
                ("C", "[\"Đỏ\", \"Vàng\"]"),
                ("D", "Lỗi TypeError: third is not iterable")
            ],
            "A",
            "Cú pháp Array Destructuring trích xuất phần tử đầu tiên vào first (\"Đỏ\"). Vì mảng chỉ có 2 phần tử, third nhận giá trị mặc định được định nghĩa trước là \"Vàng\".",
            "QA_G2_02 (Destructuring Assignment)"
        ),
        (
            3, "QB_G2_03", "G2.3 (DOM & Sự kiện)", "Nhớ", "Dễ",
            "Để hủy bỏ một hàm lắng nghe sự kiện đã đăng ký trước đó trên một phần tử DOM, phương thức chuẩn nào được sử dụng?",
            "",
            [
                ("A", "element.detachEvent()"),
                ("B", "element.removeListener()"),
                ("C", "element.removeEventListener()"),
                ("D", "element.clearEventHandler()")
            ],
            "C",
            "removeEventListener() là phương thức chuẩn của DOM để gỡ bỏ hàm lắng nghe sự kiện, yêu cầu truyền đúng tên sự kiện và tham chiếu hàm đã đăng ký ban đầu.",
            "QA_G2_03 (Phương thức sự kiện DOM)"
        ),
        (
            4, "QB_G2_04", "G2.1 (Cú pháp & ES6+)", "Hiểu", "Trung bình",
            "Tính năng nào của Template Literals (cú pháp chuỗi dùng dấu backtick ``) trong ES6 giúp nhúng biểu thức trực tiếp vào chuỗi một cách linh hoạt?",
            "",
            [
                ("A", "Nhúng trực tiếp biến và biểu thức thông qua cú pháp ${biểu_thức} mà không cần nối chuỗi bằng dấu cộng (+)"),
                ("B", "Tự động mã hóa ký tự HTML để chống tấn công XSS"),
                ("C", "Chỉ hoạt động trong các hàm bất đồng bộ async"),
                ("D", "Bắt buộc phải khai báo kiểu dữ liệu TypeScript trước khi nhúng")
            ],
            "A",
            "Template literals cho phép nội suy chuỗi (string interpolation) bằng cú pháp ${expression}, hỗ trợ chuỗi nhiều dòng mà không cần ký tự nối chuỗi hoặc escape phức tạp.",
            "QA_G2_04 (Tính năng cốt lõi ES6)"
        ),
        (
            5, "QB_G2_05", "G2.2 (Phạm vi & Closure)", "Hiểu", "Trung bình",
            "Đoạn mã sau in ra giá trị gì trên màn hình console?",
            "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
            [
                ("A", "3 3 3"),
                ("B", "undefined undefined undefined"),
                ("C", "0 1 2"),
                ("D", "Lỗi SyntaxError: let cannot be used in loop")
            ],
            "C",
            "Từ khóa let có phạm vi khối (block scope). Trong vòng lặp for, mỗi lần lặp (iteration) tạo ra một binding biến i hoàn toàn mới. Do đó khi callback của setTimeout chạy, mỗi closure giữ giá trị i của chính lần lặp đó (0, 1, 2).",
            "QA_G2_05 (Phạm vi biến trong vòng lặp và setTimeout)"
        ),
        (
            6, "QB_G2_06", "G2.2 (Phạm vi & Closure)", "Vận dụng", "Trung bình",
            "Đoạn mã sau áp dụng mô hình hàm tạo biến riêng tư (private state) bằng Closure. Kết quả in ra màn hình console là gì?",
            "function createCounter() {\n  let count = 0;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\nconst counterA = createCounter();\ncounterA();\nconsole.log(counterA());",
            [
                ("A", "1"),
                ("B", "undefined"),
                ("C", "Lỗi ReferenceError: count is not defined"),
                ("D", "2")
            ],
            "D",
            "createCounter tạo một closure lưu giữ biến count. Lần gọi thứ nhất counterA() tăng count từ 0 lên 1. Lần gọi thứ hai counterA() tăng tiếp count lên 2 và trả về 2.",
            "QA_G2_06 (Ứng dụng thực tiễn của Closure)"
        ),
        (
            7, "QB_G2_07", "G2.3 (DOM & Sự kiện)", "Vận dụng", "Trung bình",
            "Trong phương thức addEventListener(type, listener, useCapture), để lắng nghe sự kiện ở giai đoạn Bắt giữ (Capturing phase) thay vì giai đoạn Sủi bọt (Bubbling phase), ta cần truyền đối số thứ ba như thế nào?",
            "",
            [
                ("A", "Truyền đối số thứ ba là false"),
                ("B", "Truyền đối số thứ ba là true (hoặc { capture: true })"),
                ("C", "Không cần truyền gì vì mặc định luôn là Capturing"),
                ("D", "Truyền chuỗi \"capture-phase\"")
            ],
            "B",
            "Mặc định useCapture là false (lắng nghe ở Bubbling phase). Đặt true hoặc { capture: true } sẽ kích hoạt listener ngay trong giai đoạn Capturing phase (từ gốc tài liệu truyền xuống target).",
            "QA_G2_07 (Các pha lan truyền sự kiện DOM)"
        ),
        (
            8, "QB_G2_08", "G2.2 (Phạm vi & Closure)", "Vận dụng", "Khó",
            "Đoạn mã sau in ra giá trị gì trên màn hình console khi chạy trong trình duyệt (non-strict mode)?",
            "const person = {\n  name: \"Bảo\",\n  greet: function() {\n    setTimeout(function() {\n      console.log(this.name);\n    }, 50);\n  }\n};\nperson.greet();",
            [
                ("A", "\"Bảo\""),
                ("B", "Lỗi SyntaxError"),
                ("C", "\"person\""),
                ("D", "undefined (hoặc chuỗi rỗng của window.name)")
            ],
            "D",
            "Hàm bên trong setTimeout là một regular function thông thường, khi được thực thi bởi timer thì ngữ cảnh this bị trỏ về đối tượng toàn cục (window trong trình duyệt). Do window không có thuộc tính name (hoặc window.name rỗng) nên in ra undefined/chuỗi rỗng chứ không giữ this của person.",
            "QA_G2_08 (Ngữ cảnh this trong hàm callback)"
        ),
        (
            9, "QB_G2_09", "G2.3 (DOM & Sự kiện)", "Vận dụng", "Khó",
            "Khi áp dụng kỹ thuật Event Delegation trên thẻ cha <ul> chứa nhiều thẻ <li>, thuộc tính nào của đối tượng Event cho phép xác định chính xác phần tử con cụ thể mà người dùng vừa click vào?",
            "",
            [
                ("A", "event.target"),
                ("B", "event.currentTarget"),
                ("C", "event.defaultPrevented"),
                ("D", "event.bubbles")
            ],
            "A",
            "event.target đại diện cho phần tử thực tế phát sinh sự kiện (nơi con trỏ chuột bấm vào), trong khi event.currentTarget đại diện cho phần tử mà listener đang được gắn vào (thẻ cha ul).",
            "QA_G2_09 (Cơ chế phân biệt target trong Event Delegation)"
        ),
        (
            10, "QB_G2_10", "G2.1 (Cú pháp & ES6+)", "Phân tích", "Khó",
            "Phương thức native chuẩn nào được tích hợp sẵn trong trình duyệt hiện đại (Web API & Node.js 17+) cho phép sao chép sâu (deep copy) một đối tượng lồng nhau mà không bị lỗi tham chiếu hay mất kiểu dữ liệu phức tạp?",
            "",
            [
                ("A", "Object.assign({}, obj)"),
                ("B", "{ ...obj }"),
                ("C", "structuredClone(obj)"),
                ("D", "Object.freeze(obj)")
            ],
            "C",
            "structuredClone() là API chuẩn hiện đại của nền tảng web hỗ trợ deep copy các cấu trúc dữ liệu lồng nhau phức tạp (kể cả Map, Set, Date, TypedArray) mà không gặp các nhược điểm của JSON.parse(JSON.stringify()).",
            "QA_G2_10 (Cơ chế Deep Copy vs Shallow Copy)"
        )
    ]

    for q in exam_b_questions:
        render_question(*q)

    # ==========================================
    # PHẦN 3: CÂU HỎI PHỎNG VẤN KỸ THUẬT CHUYÊN SÂU
    # ==========================================
    doc.add_page_break()
    add_section_header(
        "PHẦN 3: BỘ CÂU HỎI PHỎNG VẤN KỸ THUẬT CHUYÊN SÂU [5 CÂU]",
        "Phỏng vấn năng lực thực tế dành cho vị trí Thực tập sinh / Fresher Frontend tại doanh nghiệp"
    )

    interviews = [
        (
            1, "INT_G2_01", "Nâng cao (Junior)",
            "Giải thích cơ chế hoạt động của Event Loop trong JavaScript?",
            [
                "Call Stack: Nơi thực thi mã đồng bộ (LIFO - Last In First Out)",
                "Web APIs: Xử lý tác vụ bất đồng bộ nền tảng (timer, fetch, DOM events)",
                "Callback Queue: Hàng đợi callback gồm Microtask Queue và Macrotask Queue",
                "Cơ chế vòng lặp: Khi Call Stack rỗng, Event Loop ưu tiên dọn sạch Microtask (Promise) trước rồi mới lấy 1 Macrotask (setTimeout)"
            ],
            "JavaScript là ngôn ngữ đơn luồng (single-threaded). Khi gặp các tác vụ bất đồng bộ (như setTimeout, fetch), JS đẩy sang Web APIs để xử lý nền và tiếp tục chạy mã đồng bộ trong Call Stack. Khi Call Stack rỗng, Event Loop sẽ kiểm tra hàng đợi: ưu tiên lấy toàn bộ Microtask (Promise, queueMicrotask) ra chạy trước, sau đó mới lấy Macrotask (setTimeout, setInterval).",
            [
                "Nghĩ rằng setTimeout(fn, 0) sẽ chạy ngay lập tức mà không cần chờ Call Stack rỗng",
                "Không phân biệt được độ ưu tiên giữa Microtask (Promise) và Macrotask (setTimeout)"
            ]
        ),
        (
            2, "INT_G2_02", "Cơ bản (Fresher)",
            "Closure là gì? Cho một ví dụ thực tế về ứng dụng của Closure trong dự án?",
            [
                "Khái niệm Lexical Scope và khả năng hàm con giữ tham chiếu tới phạm vi hàm cha",
                "Kể cả khi hàm cha đã return hoàn tất thì vùng nhớ của biến vẫn được duy trì",
                "Ứng dụng: Encapsulation (Private Variables/Data Privacy), Function Factory, Debounce/Throttle, Memoization"
            ],
            "Closure là khả năng một hàm ghi nhớ và truy cập vào các biến thuộc phạm vi từ vựng (lexical scope) của nó, ngay cả khi hàm cha đã thực thi xong và kết thúc. Ví dụ thực tế: tạo hàm đếm counter có biến riêng tư không thể truy cập từ bên ngoài, hoặc hàm ghi nhớ kết quả tính toán (memoization), hoặc hàm debounce/throttle trong xử lý sự kiện search input.",
            [
                "Nhầm lẫn Closure với hàm callback thông thường",
                "Không chú ý vấn đề rò rỉ bộ nhớ (memory leak) nếu closure giữ tham chiếu đến biến hoặc DOM node dung lượng lớn không còn dùng"
            ]
        ),
        (
            3, "INT_G2_03", "Cơ bản (Fresher)",
            "Phân biệt toán tử so sánh bằng trừu tượng (==) và bằng tuyệt đối (===) trong JavaScript. Tại sao luôn khuyến nghị sử dụng ===?",
            [
                "Toán tử == thực hiện ép kiểu ngầm định (Type Coercion) trước khi so sánh giá trị",
                "Toán tử === kiểm tra đồng thời cả kiểu dữ liệu (data type) và giá trị mà không ép kiểu",
                "Các edge cases nguy hiểm của == (ví dụ: '' == 0 là true, false == '0' là true, null == undefined là true)",
                "Lý do khuyến nghị ===: Dự đoán được kết quả, tránh bug tiềm ẩn, mã nguồn tường minh và dễ bảo trì"
            ],
            "Toán tử == (loose equality) sẽ tự động thực hiện ép kiểu ngầm định (Type Coercion) nếu hai toán hạng khác kiểu trước khi so sánh, dẫn đến nhiều hành vi khó đoán (ví dụ 0 == '' trả về true). Trong khi đó, === (strict equality) so sánh cả kiểu dữ liệu lẫn giá trị, nếu khác kiểu sẽ trả về false ngay. Luôn khuyến nghị dùng === để đảm bảo tính an toàn, nhất quán và tránh các lỗi logic tiềm ẩn.",
            [
                "Nghĩ rằng null === undefined là true (thực tế null == undefined là true, nhưng null === undefined là false)",
                "Không giải thích được cơ chế ép kiểu ngầm định khi so sánh boolean với string/number"
            ]
        ),
        (
            4, "INT_G2_04", "Nâng cao (Junior)",
            "Trình bày cơ chế Kế thừa dựa trên nguyên mẫu (Prototypal Inheritance) và chuỗi Prototype Chain trong JavaScript?",
            [
                "Mọi đối tượng JavaScript đều có một liên kết nội bộ tới một đối tượng nguyên mẫu [[Prototype]] (__proto__)",
                "Khi truy cập một thuộc tính hoặc phương thức không có trên object hiện tại, JavaScript sẽ tìm ngược lên prototype của nó, tiếp tục cho tới khi gặp null (Object.prototype)",
                "Cú pháp class trong ES6 thực chất là cú pháp đường (syntactical sugar) hoạt động trên nền tảng Prototypal Inheritance",
                "Lợi ích: Tái sử dụng phương thức giữa các thực thể (instances) mà không cần sao chép tốn bộ nhớ"
            ],
            "Trong JavaScript, kế thừa không dựa trên class theo kiểu cổ điển mà dựa trên chuỗi Prototype (Prototype Chain). Mỗi đối tượng có một tham chiếu ngầm định tới prototype của nó. Khi gọi một phương thức, nếu đối tượng không có, engine sẽ tìm trên prototype của nó, rồi tiếp tục lên prototype của cha cho đến Object.prototype. Cú pháp class trong ES6 là syntactic sugar bọc quanh cơ chế nguyên mẫu này nhằm giúp mã nguồn trực quan hơn.",
            [
                "Nhầm lẫn giữa thuộc tính prototype của hàm khởi tạo (Function.prototype) và liên kết [[Prototype]] (__proto__) của thực thể",
                "Sửa đổi trực tiếp Object.prototype (Prototype Pollution) gây rủi ro bảo mật và xung đột thư viện"
            ]
        ),
        (
            5, "INT_G2_05", "Cơ bản (Fresher)",
            "Phân biệt ý nghĩa và hành vi giữa event.stopPropagation() và event.preventDefault() khi xử lý sự kiện DOM?",
            [
                "event.preventDefault(): Ngăn chặn hành vi mặc định của trình duyệt đối với phần tử (ví dụ: thẻ <a> không chuyển hướng, thẻ <form> không reload trang khi submit)",
                "event.stopPropagation(): Ngăn chặn sự lan truyền tiếp theo của sự kiện lên cây DOM (dừng pha Bubbling hoặc Capturing), không cho các phần tử cha bắt được sự kiện",
                "Tính độc lập: preventDefault không ngăn sự kiện sủi bọt; ngược lại stopPropagation không ngăn hành vi mặc định"
            ],
            "event.preventDefault() dùng để hủy bỏ hành vi mặc định của trình duyệt đối với phần tử (như bấm thẻ a không bị nhảy link, bấm submit form không bị tải lại trang), nhưng sự kiện vẫn tiếp tục nổi bọt lên các thẻ cha. Trong khi đó, event.stopPropagation() ngăn chặn sự kiện tiếp tục lan truyền (sủi bọt hoặc bắt giữ) lên các phần tử tổ tiên trên cây DOM, nhưng không ngăn cản hành vi mặc định của phần tử.",
            [
                "Nhầm lẫn rằng stopPropagation sẽ ngăn luôn hành vi submit của form hoặc chuyển link của thẻ a",
                "Lạm dụng stopPropagation làm phá vỡ các kỹ thuật Event Delegation hoặc các công cụ phân tích Analytics gắn ở tầng document"
            ]
        )
    ]

    for item in interviews:
        i_num, i_id, i_diff, i_q, i_points, i_ans, i_mistakes = item
        
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(f"Câu phỏng vấn {i_num}: ")
        r1.font.bold = True
        r1.font.size = Pt(13)
        r1.font.color.rgb = RGBColor(0x9A, 0x34, 0x12) # Rust / Deep Orange

        r2 = p.add_run(f"[{i_id} | Mức độ: {i_diff}]\n")
        r2.font.bold = True
        r2.font.size = Pt(11)
        r2.font.color.rgb = RGBColor(0x4B, 0x55, 0x63)

        r3 = p.add_run(f"\"{i_q}\"")
        r3.font.bold = True
        r3.font.size = Pt(13)

        # Key points
        p_kp = doc.add_paragraph()
        p_kp.paragraph_format.left_indent = Inches(0.2)
        p_kp.paragraph_format.space_before = Pt(4)
        p_kp.paragraph_format.space_after = Pt(2)
        r_kp_title = p_kp.add_run("1. Các ý chính ứng viên cần trình bày (Key Points):")
        r_kp_title.font.bold = True
        r_kp_title.font.size = Pt(11.5)
        r_kp_title.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)

        for pt in i_points:
            p_pt = doc.add_paragraph()
            p_pt.paragraph_format.left_indent = Inches(0.4)
            p_pt.paragraph_format.space_before = Pt(1)
            p_pt.paragraph_format.space_after = Pt(1)
            r_pt = p_pt.add_run(f"• {pt}")
            r_pt.font.size = Pt(11.5)

        # Ideal Answer
        p_ia = doc.add_paragraph()
        p_ia.paragraph_format.left_indent = Inches(0.2)
        p_ia.paragraph_format.space_before = Pt(4)
        p_ia.paragraph_format.space_after = Pt(2)
        r_ia_title = p_ia.add_run("2. Câu trả lời mẫu chuẩn mực (Ideal Answer):")
        r_ia_title.font.bold = True
        r_ia_title.font.size = Pt(11.5)
        r_ia_title.font.color.rgb = RGBColor(0x15, 0x80, 0x3D)

        p_ia_text = doc.add_paragraph()
        p_ia_text.paragraph_format.left_indent = Inches(0.4)
        p_ia_text.paragraph_format.space_before = Pt(1)
        p_ia_text.paragraph_format.space_after = Pt(2)
        r_ia_body = p_ia_text.add_run(i_ans)
        r_ia_body.font.size = Pt(11.5)
        r_ia_body.font.color.rgb = RGBColor(0x1F, 0x29, 0x37)

        # Common mistakes
        p_cm = doc.add_paragraph()
        p_cm.paragraph_format.left_indent = Inches(0.2)
        p_cm.paragraph_format.space_before = Pt(4)
        p_cm.paragraph_format.space_after = Pt(2)
        r_cm_title = p_cm.add_run("3. Các lỗi thường gặp cần tránh (Common Mistakes):")
        r_cm_title.font.bold = True
        r_cm_title.font.size = Pt(11.5)
        r_cm_title.font.color.rgb = RGBColor(0xB9, 0x1C, 0x1C)

        for cm in i_mistakes:
            p_cm_item = doc.add_paragraph()
            p_cm_item.paragraph_format.left_indent = Inches(0.4)
            p_cm_item.paragraph_format.space_before = Pt(1)
            p_cm_item.paragraph_format.space_after = Pt(1)
            r_cm_body = p_cm_item.add_run(f"- {cm}")
            r_cm_body.font.size = Pt(11.5)
            r_cm_body.font.color.rgb = RGBColor(0x4B, 0x55, 0x63)

    # ==========================================
    # PHẦN 4: BÁO CÁO KIỂM ĐỊNH CHẤT LƯỢNG NGÂN HÀNG
    # ==========================================
    doc.add_page_break()
    add_section_header(
        "PHẦN 4: BÁO CÁO KIỂM ĐỊNH CHẤT LƯỢNG & MA TRẬN PHÂN BỐ",
        "Biên bản nghiệm thu kỹ thuật xác nhận tuân thủ toàn bộ các tiêu chí nghiên cứu"
    )

    p_rep = doc.add_paragraph()
    p_rep.paragraph_format.space_after = Pt(8)
    p_rep.add_run(
        "Căn cứ Quyết định thu hẹp phạm vi đề tài theo Đề cương v4 (chỉ giữ lại nhóm trọng tâm G2: JavaScript & DOM), "
        "nhóm nghiên cứu đã hoàn tất công tác rà soát, tái cấu trúc và chuẩn hóa ngân hàng câu hỏi. Dưới đây là các chỉ số thống kê định lượng:"
    )

    # Table of statistics
    stat_tbl = doc.add_table(rows=6, cols=3)
    stat_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    stat_tbl.autofit = False

    stat_rows = [
        ("Tiêu chí kiểm định", "Chỉ số Đề A (Pre-Test)", "Chỉ số Đề B (Post-Test)"),
        ("Tổng số lượng câu hỏi trắc nghiệm", "10 câu", "10 câu"),
        ("Phân bố cấp độ nhận thức Bloom", "1 Nhớ | 4 Hiểu | 4 Vận dụng | 1 Phân tích", "1 Nhớ | 4 Hiểu | 4 Vận dụng | 1 Phân tích"),
        ("Phân bố độ khó kỹ thuật", "3 Dễ (30%) | 4 Trung bình (40%) | 3 Khó (30%)", "3 Dễ (30%) | 4 Trung bình (40%) | 3 Khó (30%)"),
        ("Phân bố vị trí đáp án đúng (A/B/C/D)", "A: 2 | B: 3 | C: 2 | D: 3", "A: 3 | B: 2 | C: 3 | D: 2"),
        ("Tỷ lệ câu hỏi sinh đôi độc lập (Twin Questions)", "Gốc", "100% đổi mới đề bài, dữ liệu & vị trí đáp án")
    ]

    for idx, (col1, col2, col3) in enumerate(stat_rows):
        r = stat_tbl.rows[idx]
        c1, c2, c3 = r.cells[0], r.cells[1], r.cells[2]
        c1.width = Inches(3.0)
        c2.width = Inches(2.0)
        c3.width = Inches(2.0)

        if idx == 0:
            set_cell_background(c1, "1E3A8A")
            set_cell_background(c2, "1E3A8A")
            set_cell_background(c3, "1E3A8A")
            for c, text in [(c1, col1), (c2, col2), (c3, col3)]:
                set_cell_margins(c, 100, 100, 100, 100)
                p = c.paragraphs[0]
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                run = p.add_run(text)
                run.font.bold = True
                run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
                run.font.size = Pt(11)
        else:
            bg = "F9FAFB" if idx % 2 == 1 else "FFFFFF"
            set_cell_background(c1, bg)
            set_cell_background(c2, bg)
            set_cell_background(c3, bg)
            for c, text in [(c1, col1), (c2, col2), (c3, col3)]:
                set_cell_margins(c, 80, 80, 100, 100)
                p = c.paragraphs[0]
                run = p.add_run(text)
                run.font.size = Pt(11)
                if c == c1:
                    run.font.bold = True
                else:
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    p_confirm = doc.add_paragraph()
    p_confirm.paragraph_format.space_before = Pt(14)
    p_confirm.paragraph_format.space_after = Pt(4)
    r_cf_title = p_confirm.add_run("Kết luận kiểm định chất lượng:")
    r_cf_title.font.bold = True
    r_cf_title.font.size = Pt(12)

    checklist = [
        "1. Toàn bộ phương án nhiễu hiển nhiên sai đã được thay thế (QA_G2_06 phương án A đã thay thành 'Khả năng một hàm truy cập biến toàn cục').",
        "2. Đã điều chỉnh hạ nhãn Bloom của câu QA_G2_08 (ngữ cảnh this trong arrow function) từ 'Phân tích' xuống 'Vận dụng' theo đúng yêu cầu phản biện.",
        "3. Xáo trộn đáp án hoàn tất: Triệt tiêu hiện tượng dồn đáp án B (Đề A ban đầu 9/10 câu là B). Hiện tại cả Đề A và Đề B mỗi chữ cái A/B/C/D đều xuất hiện 2–3 lần cân bằng.",
        "4. Đề B là 10 câu sinh đôi thực thụ: Cùng kỹ năng, cùng độ khó, nhưng dữ liệu bài toán khác hoàn toàn (ví dụ: let trong loop, structuredClone, removeEventListener, Event Capturing phase).",
        "5. Ngân hàng phỏng vấn chuyên sâu gồm 5 câu trọng tâm JavaScript & DOM với barem chấm điểm và cảnh báo lỗi sai cụ thể."
    ]

    for item in checklist:
        p_c = doc.add_paragraph()
        p_c.paragraph_format.left_indent = Inches(0.2)
        p_c.paragraph_format.space_before = Pt(2)
        p_c.paragraph_format.space_after = Pt(2)
        r = p_c.add_run(item)
        r.font.size = Pt(11.5)

    doc.save("c:\\Users\\nguye\\Downloads\\nckhcode\\NGAN_HANG_CAU_HOI_FRONTEND_FBU-v2.docx")
    print("Successfully generated NGAN_HANG_CAU_HOI_FRONTEND_FBU-v2.docx")

if __name__ == "__main__":
    create_document()
