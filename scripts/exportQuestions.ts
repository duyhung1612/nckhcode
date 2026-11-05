import fs from 'fs';
import path from 'path';
import { ALL_QUESTIONS } from '../src/models/seedQuestions';
import { SEED_INTERVIEW_QUESTIONS } from '../src/models/seedInterview';
import { SEED_SKILL_GROUPS } from '../src/models/seedSkills';

function generateTextFile() {
  const outputPath = path.resolve(process.cwd(), 'NGAN_HANG_CAU_HOI_FRONTEND_FBU.txt');

  let output = '';
  const lineBreak = '='.repeat(80) + '\n';
  const subDivider = '-'.repeat(80) + '\n';

  output += lineBreak;
  output += 'TRƯỜNG ĐẠI HỌC TÀI CHÍNH – NGÂN HÀNG HÀ NỘI (FBU)\n';
  output += 'VIỆN CÔNG NGHỆ THÔNG TIN\n';
  output += 'ĐỀ TÀI NGHIÊN CỨU KHOA HỌC SINH VIÊN 2026–2027\n';
  output += 'Tên đề tài: Xây dựng và thử nghiệm mô hình đánh giá khoảng cách kỹ năng\n';
  output += '           và đề xuất lộ trình học bổ sung cho sinh viên định hướng Frontend tại Viện CNTT FBU\n';
  output += 'Nhóm sinh viên nghiên cứu: Nguyễn Duy Hưng (Trưởng nhóm), Nguyễn Hải Đăng\n';
  output += 'Giảng viên hướng dẫn: ThS. Nguyễn Thanh Tuyên\n';
  output += lineBreak + '\n';

  output += 'BỘ TÀI LIỆU TOÀN VĂN: NGÂN HÀNG CÂU HỎI ĐÁNH GIÁ & PHỎNG VẤN FRONTEND\n';
  output += `Tổng số câu hỏi trắc nghiệm ma trận: ${ALL_QUESTIONS.length} câu (Đề A: 60 câu, Đề B sinh đôi: 60 câu)\n`;
  output += `Tổng số câu hỏi phỏng vấn kỹ thuật chuyên sâu: ${SEED_INTERVIEW_QUESTIONS.length} câu\n`;
  output += subDivider + '\n';

  // Helper map for group info
  const groupMap = new Map(SEED_SKILL_GROUPS.map(g => [g.id, g]));

  // =========================================================================
  // PHẦN 1: ĐỀ A
  // =========================================================================
  output += lineBreak;
  output += 'PHẦN 1: ĐỀ A – BỘ CÂU HỎI ĐÁNH GIÁ TIỀN KIỂM (PRE-TEST) [60 CÂU]\n';
  output += 'Cấu trúc ma trận: 6 Nhóm kỹ năng x 10 câu (3 Dễ / 4 Trung bình / 3 Khó)\n';
  output += lineBreak + '\n';

  const examAQuestions = ALL_QUESTIONS.filter(q => q.examSet === 'A');

  SEED_SKILL_GROUPS.forEach((group, gIdx) => {
    const groupQs = examAQuestions.filter(q => q.skillGroupId === group.id);
    output += `\n${subDivider}`;
    output += `NHÓM ${gIdx + 1}: ${group.id} - ${group.name.toUpperCase()} (Trọng số ban đầu: ${Math.round(group.initialWeight * 100)}%)\n`;
    output += `Mô tả: ${group.description}\n`;
    output += `${subDivider}\n`;

    groupQs.forEach((q, idx) => {
      output += `[Câu ${idx + 1}] Mã ID: ${q.id} | Nhóm: ${q.skillGroupId} (${q.subSkillId}) | Bloom: ${q.bloomLevel} | Độ khó: ${q.difficulty}\n`;
      output += `Nội dung: ${q.content}\n`;
      if (q.codeSnippet) {
        output += `Đoạn mã code:\n----------------\n${q.codeSnippet}\n----------------\n`;
      }
      output += 'Các phương án lựa chọn:\n';
      q.options.forEach(opt => {
        output += `   ${opt.key}. ${opt.text}\n`;
      });
      output += `>>> ĐÁP ÁN ĐÚNG: [ ${q.correctAnswer} ]\n`;
      output += `>>> GIẢI THÍCH: ${q.explanation}\n`;
      if (q.twinQuestionId) {
        output += `>>> Câu sinh đôi tương ứng ở Đề B: ${q.twinQuestionId}\n`;
      }
      output += '\n';
    });
  });

  // =========================================================================
  // PHẦN 2: ĐỀ B (SINH ĐÔI)
  // =========================================================================
  output += '\n' + lineBreak;
  output += 'PHẦN 2: ĐỀ B – BỘ CÂU HỎI HẬU KIỂM SINH ĐÔI (POST-TEST) [60 CÂU]\n';
  output += 'Cấu trúc tương đương 100% về ma trận Bloom và độ khó phục vụ đo lường tiến bộ thực nghiệm\n';
  output += lineBreak + '\n';

  const examBQuestions = ALL_QUESTIONS.filter(q => q.examSet === 'B');

  SEED_SKILL_GROUPS.forEach((group, gIdx) => {
    const groupQs = examBQuestions.filter(q => q.skillGroupId === group.id);
    output += `\n${subDivider}`;
    output += `NHÓM ${gIdx + 1}: ${group.id} - ${group.name.toUpperCase()} (Đề B - Hậu kiểm)\n`;
    output += `${subDivider}\n`;

    groupQs.forEach((q, idx) => {
      output += `[Câu ${idx + 1}] Mã ID: ${q.id} | Nhóm: ${q.skillGroupId} (${q.subSkillId}) | Bloom: ${q.bloomLevel} | Độ khó: ${q.difficulty}\n`;
      output += `Nội dung: ${q.content}\n`;
      if (q.codeSnippet) {
        output += `Đoạn mã code:\n----------------\n${q.codeSnippet}\n----------------\n`;
      }
      output += 'Các phương án lựa chọn:\n';
      q.options.forEach(opt => {
        output += `   ${opt.key}. ${opt.text}\n`;
      });
      output += `>>> ĐÁP ÁN ĐÚNG: [ ${q.correctAnswer} ]\n`;
      output += `>>> GIẢI THÍCH: ${q.explanation}\n`;
      if (q.twinQuestionId) {
        output += `>>> Câu gốc tương ứng ở Đề A: ${q.twinQuestionId}\n`;
      }
      output += '\n';
    });
  });

  // =========================================================================
  // PHẦN 3: BỘ CÂU HỎI PHỎNG VẤN KỸ THUẬT (MOCK INTERVIEW)
  // =========================================================================
  output += '\n' + lineBreak;
  output += 'PHẦN 3: BỘ CÂU HỎI PHỎNG VẤN KỸ THUẬT FRONTEND THỰC TẾ (MOCK INTERVIEW) [18 CÂU]\n';
  output += 'Tổng hợp từ các yêu cầu tuyển dụng thực tế và phỏng vấn Tech Lead doanh nghiệp\n';
  output += lineBreak + '\n';

  SEED_INTERVIEW_QUESTIONS.forEach((iq, idx) => {
    output += `[Câu phỏng vấn ${idx + 1}] Mã: ${iq.id} | Nhóm kỹ năng: ${iq.skillGroupId} (${iq.skillName}) | Mức độ: ${iq.difficulty}\n`;
    output += `CÂU HỎI: "${iq.question}"\n\n`;
    output += `CÁC Ý CHÍNH CẦN NÊU ĐƯỢC (KEY POINTS):\n`;
    iq.keyPointsToMention.forEach((kp, kpIdx) => {
      output += `   ${kpIdx + 1}. ${kp}\n`;
    });
    output += `\nCÂU TRẢ LỜI MẪU CHUẨN MỰC:\n${iq.idealAnswer}\n\n`;
    output += `CÁC LỖI THƯỜNG GẶP CẦN TRÁNH:\n`;
    iq.commonMistakes.forEach((err, errIdx) => {
      output += `   - ${err}\n`;
    });
    output += '\n' + '-'.repeat(60) + '\n\n';
  });

  fs.writeFileSync(outputPath, output, 'utf-8');
  console.log(`Đã xuất thành công ${ALL_QUESTIONS.length} câu trắc nghiệm + ${SEED_INTERVIEW_QUESTIONS.length} câu phỏng vấn vào file: ${outputPath}`);
}

generateTextFile();
