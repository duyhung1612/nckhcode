import docx
import re

def validate_doc(filepath):
    doc = docx.Document(filepath)
    text = "\n".join([p.text for p in doc.paragraphs])
    
    print("=== KIỂM TRA ĐỊNH DẠNG & NỘI DUNG TỆP WORD ===")
    
    # 1. Check Questions in Exam A
    qa_ids = re.findall(r"\[(QA_G2_\d{2})", text)
    print(f"Số câu hỏi Đề A (Pre-Test): {len(qa_ids)} -> {qa_ids}")
    
    # 2. Check Questions in Exam B
    qb_ids = re.findall(r"\[(QB_G2_\d{2})", text)
    print(f"Số câu hỏi Đề B (Post-Test): {len(qb_ids)} -> {qb_ids}")
    
    # 3. Check Interview Questions
    int_ids = re.findall(r"\[(INT_G2_\d{2})", text)
    print(f"Số câu hỏi Phỏng vấn (Phần 3): {len(int_ids)} -> {int_ids}")
    
    # Check Exam A keys
    # Match patterns like: [QA_G2_... ... ► Đáp án đúng: [X]
    # Let's extract answer keys for QA and QB
    for part_name, pattern_prefix in [("Đề A", "QA"), ("Đề B", "QB")]:
        key_counts = {"A": 0, "B": 0, "C": 0, "D": 0}
        diff_counts = {"Dễ": 0, "Trung bình": 0, "Khó": 0}
        bloom_counts = {}
        
        # Split by question
        questions = re.findall(rf"\[({pattern_prefix}_G2_\d{{2}}) \| Nhóm: (.*?) \| Bloom: (.*?) \| Độ khó: (.*?)\][\s\S]*?► Đáp án đúng: \[([ABCD])\]", text)
        for q_id, skill, bloom, diff, key in questions:
            key_counts[key] = key_counts.get(key, 0) + 1
            diff_counts[diff] = diff_counts.get(diff, 0) + 1
            bloom_counts[bloom] = bloom_counts.get(bloom, 0) + 1
            
        print(f"\n--- Phân tích chi tiết {part_name} ---")
        print(f"Tổng số câu: {len(questions)}")
        print(f"Phân bố Đáp án đúng: {key_counts}")
        print(f"Phân bố Độ khó: {diff_counts}")
        print(f"Phân bố Bloom: {bloom_counts}")

    # Check Specific requirements
    print("\n--- KIỂM TRA CÁC ĐIỀU KIỆN ĐẶC BIỆT ---")
    # 1. QA_G2_08 bloom downgrade
    g2_08_match = re.search(r"\[QA_G2_08 \| Nhóm: .*? \| Bloom: (.*?) \|", text)
    if g2_08_match:
        print(f"Nhãn Bloom của QA_G2_08: {g2_08_match.group(1)} (Đã hạ xuống 'Vận dụng': {g2_08_match.group(1) == 'Vận dụng'})")

    # 2. QA_G2_06 distractor
    has_old_distractor = "Một hàm tự động đóng trình duyệt" in text
    has_new_distractor = "Khả năng một hàm truy cập biến toàn cục" in text
    print(f"QA_G2_06: Loại bỏ phương án vô lý cũ: {not has_old_distractor}")
    print(f"QA_G2_06: Đã có phương án nhiễu hợp lý mới: {has_new_distractor}")
    
    # 3. Check twin questions difference
    # Let's compare question text of QA_G2_05 and QB_G2_05
    qa_05_text = "for (var i = 0; i < 3; i++)" in text
    qb_05_text = "for (let i = 0; i < 3; i++)" in text
    print(f"Câu sinh đôi Q5: Đề A có 'var' ({qa_05_text}), Đề B có 'let' ({qb_05_text}) -> Khác biệt dữ liệu: {qa_05_text and qb_05_text}")

if __name__ == "__main__":
    validate_doc("c:\\Users\\nguye\\Downloads\\nckhcode\\NGAN_HANG_CAU_HOI_FRONTEND_FBU-v2.docx")
