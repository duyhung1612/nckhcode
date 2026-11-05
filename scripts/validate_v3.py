import re

def validate_v3():
    with open("c:\\Users\\nguye\\Downloads\\nckhcode\\NGAN_HANG_CAU_HOI_FRONTEND_FBU-v3.txt", "r", encoding="utf-8") as f:
        text = f.read()

    print("================ KIỂM ĐỊNH TẬP TIN v3 ================")
    
    # 1. Total questions
    qa_list = re.findall(r"Câu \d+\. \[(QA_G2_\d{2})", text)
    qb_list = re.findall(r"Câu \d+\. \[(QB_G2_\d{2})", text)
    int_list = re.findall(r"Câu phỏng vấn \d+: \[(INT_G2_\d{2})", text)

    print(f"1. Số câu Đề A: {len(qa_list)} -> {qa_list}")
    print(f"   Số câu Đề B: {len(qb_list)} -> {qb_list}")
    assert len(qa_list) == 10, f"Đề A phải có 10 câu, có {len(qa_list)}"
    assert len(qb_list) == 10, f"Đề B phải có 10 câu, có {len(qb_list)}"

    # 2 & 3. Difficulty and Answer Key Distribution
    def check_exam(prefix, name):
        diffs = {"Dễ": 0, "Trung bình": 0, "Khó": 0}
        keys = {"A": 0, "B": 0, "C": 0, "D": 0}
        matches = re.findall(rf"\[{prefix}_G2_\d{{2}} \| .*? \| Bloom: .*? \| Độ khó: (.*?)\][\s\S]*?► Đáp án đúng: \[([ABCD])\]", text)
        for diff, key in matches:
            diffs[diff] = diffs.get(diff, 0) + 1
            keys[key] = keys.get(key, 0) + 1
        print(f"\n2 & 3. {name}:")
        print(f"   - Phân bố độ khó: {diffs}")
        print(f"   - Phân bố đáp án đúng: {keys}")
        return diffs, keys

    diff_a, keys_a = check_exam("QA", "Đề A")
    diff_b, keys_b = check_exam("QB", "Đề B")

    assert diff_a == {"Dễ": 3, "Trung bình": 4, "Khó": 3}, f"Độ khó Đề A sai: {diff_a}"
    assert diff_b == {"Dễ": 3, "Trung bình": 4, "Khó": 3}, f"Độ khó Đề B sai: {diff_b}"
    assert keys_a == {"A": 2, "B": 3, "C": 2, "D": 3}, f"Đáp án Đề A sai: {keys_a}"
    assert keys_b == {"A": 2, "B": 3, "C": 3, "D": 2}, f"Đáp án Đề B sai: {keys_b}"

    # 4. Check QB_G2_04 is arrow function with TypeError
    qb4_match = re.search(r"Câu 4\. \[QB_G2_04[\s\S]*?► Đáp án đúng: \[(.*?)\][\s\S]*?► Đối sánh câu gốc: (.*?)\n", text)
    assert qb4_match, "Không tìm thấy QB_G2_04"
    qb4_text = qb4_match.group(0)
    assert "new Person" in qb4_text, "QB_G2_04 phải có new Person"
    assert "TypeError: Person is not a constructor" in qb4_text, "QB_G2_04 phải có đáp án TypeError"
    assert "Template Literals" not in qb4_text, "QB_G2_04 không được còn Template Literals"
    assert qb4_match.group(1) == "B", f"Đáp án QB_G2_04 phải là B, hiện là {qb4_match.group(1)}"
    print("\n4. Đề B Câu 4: Đã cập nhật câu Arrow Function + new Person (TypeError), không còn Template Literals. Đáp án: [B].")

    # 5. Check QB_G2_08 option D and explanation
    qb8_match = re.search(r"Câu 8\. \[QB_G2_08[\s\S]*?► Đáp án đúng: \[(.*?)\][\s\S]*?► Giải thích chi tiết: (.*?)\n", text)
    assert qb8_match, "Không tìm thấy QB_G2_08"
    assert "D. Chuỗi rỗng (window.name mặc định là chuỗi rỗng)" in qb8_match.group(0), "Phương án D của QB_G2_08 chưa khớp"
    assert "Thuộc tính window.name mặc định là chuỗi rỗng" in qb8_match.group(2), "Giải thích QB_G2_08 chưa khớp"
    print("5. Đề B Câu 8: Phương án D là 'Chuỗi rỗng (window.name mặc định là chuỗi rỗng)' và giải thích chuẩn mực.")

    # 5b. Check QA_G2_05 explanation
    qa5_match = re.search(r"Câu 5\. \[QA_G2_05[\s\S]*?► Giải thích chi tiết: (.*?)\n", text)
    assert qa5_match, "Không tìm thấy QA_G2_05"
    assert "biến i đã có giá trị là 3" in qa5_match.group(1), "QA_G2_05 giải thích chưa sửa"
    assert "biến i toàn cục/hàm" not in qa5_match.group(1), "QA_G2_05 vẫn còn cụm 'toàn cục/hàm'"
    print("5b. Đề A Câu 5: Đã sửa giải thích thành 'biến i đã có giá trị là 3'.")

    # 6. Part 3 check
    assert "PHẦN 3: BỘ CÂU HỎI PHỎNG VẤN KỸ THUẬT CHUYÊN SÂU [6 CÂU]" in text, "Tiêu đề Phần 3 chưa đổi thành [6 CÂU]"
    assert len(int_list) == 6, f"Phần 3 phải đủ 6 câu, hiện có {len(int_list)}"
    main_sources = re.findall(r"Nguồn chính: .*?(https?://\S+)", text)
    assert len(main_sources) == 6, f"Mỗi câu trong 6 câu phải có Nguồn chính với link, hiện có {len(main_sources)}"
    assert "DOM là gì?" in text, "Thiếu câu DOM là gì"
    print(f"6. Phần 3: Tiêu đề [6 CÂU], đủ 6 câu phỏng vấn, 6 link Nguồn chính hợp lệ -> {main_sources}")

    # 7. Check "barem chấm điểm"
    has_barem = "barem chấm điểm" in text.lower()
    assert not has_barem, "Vẫn còn xuất hiện chuỗi 'barem chấm điểm' trong tài liệu!"
    print("7. Không còn bất kỳ xuất hiện nào của cụm từ 'barem chấm điểm'.")

    print("\n===> TẤT CẢ CÁC TIÊU CHÍ KIỂM ĐỊNH ĐÃ ĐẠT 100%!")

if __name__ == "__main__":
    validate_v3()
