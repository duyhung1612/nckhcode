// ============================================================================
// CONTROLLER LAYER: RUBRIC GRADING CONTROLLER (CHẤM MÙ BÀI THỰC HÀNH)
// Thực hiện nguyên tắc đối chiếu mù theo mục 7.5 trong đề cương
// ============================================================================
import { StorageModel } from '../models/storage';
import { PracticalSubmission, StudentProfile } from '../models/types';

export class RubricGradingController {
  /**
   * Lưu bài nộp thực hành của sinh viên
   */
  static submitPracticalExercise(
    studentId: string,
    gitRepoUrl: string,
    liveDemoUrl: string,
    commitLogSummary: string,
    notes?: string
  ): PracticalSubmission {
    const student = StorageModel.getStudentById(studentId);
    if (!student) throw new Error('Không tìm thấy sinh viên');

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const submission: PracticalSubmission = {
      id: `SUB_${Date.now()}`,
      studentId,
      submittedAt: dateStr,
      gitRepoUrl,
      liveDemoUrl,
      commitLogSummary,
      notes,
      scores: []
    };

    student.practicalSubmission = submission;
    StorageModel.updateStudent(student);
    return submission;
  }

  /**
   * Giảng viên / Chuyên gia chấm mù bài thực hành
   * (Không được cung cấp trước kết quả trắc nghiệm và chẩn đoán của hệ thống)
   */
  static addEvaluatorScore(
    studentId: string,
    evaluatorName: string,
    criteriaScores: Record<string, number>,
    feedback: string
  ): {
    hasDiscrepancy: boolean;
    discrepancyMessage?: string;
  } {
    const student = StorageModel.getStudentById(studentId);
    if (!student || !student.practicalSubmission) {
      throw new Error('Sinh viên chưa nộp bài thực hành');
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newScore = {
      evaluatorId: `EVAL_${Date.now()}`,
      evaluatorName,
      evaluatedAt: dateStr,
      criteriaScores,
      feedback
    };

    if (!student.practicalSubmission.scores) {
      student.practicalSubmission.scores = [];
    }

    // Kiểm tra chênh lệch với người chấm trước đó (nếu có từ 2 người chấm trở lên)
    let hasDiscrepancy = false;
    let discrepancyMessage = '';

    if (student.practicalSubmission.scores.length > 0) {
      const prevScore = student.practicalSubmission.scores[0];
      for (const [critId, score] of Object.entries(criteriaScores)) {
        const prevCritScore = prevScore.criteriaScores[critId] ?? 0;
        const diff = Math.abs(score - prevCritScore);
        if (diff >= 2) {
          hasDiscrepancy = true;
          discrepancyMessage = `Cảnh báo thẩm định NCKH: Tiêu chí ${critId} có sự chênh lệch ${diff} điểm giữa 2 chuyên gia (${prevCritScore} vs ${score}). Cần đối chiếu và thống nhất theo quy định mục 7.5.`;
          break;
        }
      }
    }

    student.practicalSubmission.scores.push(newScore);
    StorageModel.updateStudent(student);

    return { hasDiscrepancy, discrepancyMessage };
  }
}
