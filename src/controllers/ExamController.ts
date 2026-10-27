// ============================================================================
// CONTROLLER LAYER: EXAM CONTROLLER (ĐIỀU HÀNH KỲ ĐÁNH GIÁ TRẮC NGHIỆM)
// ============================================================================
import { Question, ExamAnswer, DiagnosticReport, StudentProfile } from '../models/types';
import { ALL_QUESTIONS } from '../models/seedQuestions';
import { GapDiagnosticController } from './GapDiagnosticController';
import { RoadmapEngineController } from './RoadmapEngineController';
import { StorageModel } from '../models/storage';

export class ExamController {
  /**
   * Lấy danh sách câu hỏi theo bộ đề A hoặc B (60 câu)
   */
  static getQuestionsForExam(examSet: 'A' | 'B'): Question[] {
    return ALL_QUESTIONS.filter(q => q.examSet === examSet);
  }

  /**
   * Hoàn tất bài thi, tính điểm C(s), chẩn đoán Gap(s), sinh lộ trình và lưu vào hồ sơ
   */
  static submitExam(
    studentId: string,
    examSet: 'A' | 'B',
    answers: ExamAnswer[],
    isPostTest: boolean = false
  ): DiagnosticReport {
    const student = StorageModel.getStudentById(studentId);
    const questions = this.getQuestionsForExam(examSet);

    // 1. Chẩn đoán kỹ năng
    const skillScores = GapDiagnosticController.evaluateExamAnswers(answers, questions);

    // 2. Tính điểm trung bình có trọng số toàn bài
    const weightedTotal = skillScores.reduce(
      (sum, s) => sum + s.currentScore * s.weight,
      0
    );
    const totalScore = Math.round(weightedTotal);

    // 3. Đánh giá xếp loại tổng quan
    let overallRating: DiagnosticReport['overallRating'] = 'Chưa đạt yêu cầu';
    const weakCount = skillScores.filter(s => s.isWeak).length;
    if (weakCount === 0 && totalScore >= 75) {
      overallRating = 'Sẵn sàng ứng tuyển thực tập';
    } else if (weakCount <= 2 && totalScore >= 60) {
      overallRating = 'Cần bổ sung một số kỹ năng';
    }

    // 4. Sinh lộ trình học bổ sung
    const roadmap = RoadmapEngineController.generateRoadmap(
      skillScores,
      student?.availableHoursPerDay || 2.0
    );

    const totalRecommendedHours = roadmap.reduce((acc, step) => acc + step.estimatedHours, 0);

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const report: DiagnosticReport = {
      studentId,
      studentCode: student?.code || 'Ẩn danh',
      examSet,
      completedAt: dateStr,
      totalScore,
      overallRating,
      skillScores,
      roadmap,
      totalRecommendedHours
    };

    // 5. Cập nhật hồ sơ sinh viên
    if (student) {
      if (isPostTest) {
        student.postTestReport = report;
      } else {
        student.preTestReport = report;
      }
      StorageModel.updateStudent(student);
    }

    return report;
  }
}
