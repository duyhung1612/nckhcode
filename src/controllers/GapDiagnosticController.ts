// ============================================================================
// CONTROLLER LAYER: GAP DIAGNOSTIC ENGINE (CHẨN ĐOÁN KHOẢNG CÁCH KỸ NĂNG)
// Căn cứ công thức: C(s), R(s), Gap(s) = max(0, R(s) - C(s)) từ mục 7.4 đề cương
// ============================================================================
import { SkillScore, Question, ExamAnswer, SkillGroup } from '../models/types';
import { StorageModel } from '../models/storage';
import { SEED_SKILL_GROUPS } from '../models/seedSkills';

export class GapDiagnosticController {
  private static resolveGroups(groups?: SkillGroup[]): SkillGroup[] {
    if (groups && groups.length > 0) return groups;
    try {
      if (typeof StorageModel !== 'undefined' && StorageModel.getSkillGroups) {
        return StorageModel.getSkillGroups();
      }
    } catch {}
    return SEED_SKILL_GROUPS;
  }

  private static resolveThreshold(custom?: number): number {
    if (typeof custom === 'number') return custom;
    try {
      if (typeof StorageModel !== 'undefined' && StorageModel.getRequiredThreshold) {
        return StorageModel.getRequiredThreshold();
      }
    } catch {}
    return 70;
  }

  /**
   * Tính toán điểm số hiện tại C(s) và khoảng cách Gap(s) từ bài làm trắc nghiệm
   */
  static evaluateExamAnswers(
    answers: ExamAnswer[],
    questions: Question[],
    customThreshold?: number,
    groups?: SkillGroup[]
  ): SkillScore[] {
    const skillGroups = this.resolveGroups(groups);
    const threshold = this.resolveThreshold(customThreshold);

    return skillGroups.map(group => {
      const groupQuestions = questions.filter(q => q.skillGroupId === group.id);
      const totalQuestions = groupQuestions.length;

      if (totalQuestions === 0) {
        return {
          skillGroupId: group.id,
          skillName: group.name,
          weight: group.initialWeight,
          currentScore: 0,
          requiredScore: threshold,
          gap: threshold,
          weightedGap: threshold * group.initialWeight,
          isWeak: true
        };
      }

      // Đếm số câu đúng
      let correctCount = 0;
      const subSkillStats: Record<string, { correct: number; total: number }> = {};

      group.subSkills.forEach(sub => {
        subSkillStats[sub.id] = { correct: 0, total: 0 };
      });

      groupQuestions.forEach(q => {
        const studentAns = answers.find(a => a.questionId === q.id);
        const isCorrect = studentAns?.selectedOption === q.correctAnswer;
        if (isCorrect) correctCount++;

        if (subSkillStats[q.subSkillId]) {
          subSkillStats[q.subSkillId].total++;
          if (isCorrect) subSkillStats[q.subSkillId].correct++;
        }
      });

      // C(s) quy về thang 100
      const currentScore = Math.round((correctCount / totalQuestions) * 100);
      const gap = Math.max(0, threshold - currentScore);
      const weightedGap = parseFloat((gap * group.initialWeight).toFixed(2));

      const subSkillDetails = group.subSkills.map(sub => {
        const stats = subSkillStats[sub.id] || { correct: 0, total: 0 };
        return {
          subSkillId: sub.id,
          subSkillName: sub.name,
          correctCount: stats.correct,
          totalCount: stats.total,
          percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
        };
      });

      return {
        skillGroupId: group.id,
        skillName: group.name,
        weight: group.initialWeight,
        currentScore,
        requiredScore: threshold,
        gap,
        weightedGap,
        isWeak: gap > 0,
        subSkillDetails
      };
    });
  }

  /**
   * Tạo SkillScores trực tiếp từ điểm C(s) cho trước (Phục vụ kiểm thử Hồ sơ A và B)
   */
  static createFromPresetScores(
    scoresMap: Record<string, number>,
    customThreshold?: number,
    groups?: SkillGroup[]
  ): SkillScore[] {
    const skillGroups = this.resolveGroups(groups);
    const threshold = this.resolveThreshold(customThreshold);

    return skillGroups.map(group => {
      const currentScore = scoresMap[group.id] ?? 50;
      const gap = Math.max(0, threshold - currentScore);
      const weightedGap = parseFloat((gap * group.initialWeight).toFixed(2));

      return {
        skillGroupId: group.id,
        skillName: group.name,
        weight: group.initialWeight,
        currentScore,
        requiredScore: threshold,
        gap,
        weightedGap,
        isWeak: gap > 0
      };
    });
  }

  /**
   * Kiểm tra độ nhạy (Sensitivity Analysis): Thử nghiệm với các ngưỡng 65, 70, 75
   * và biến thiên trọng số ±5% theo yêu cầu mục 7.2
   */
  static runSensitivityTest(
    skillScores: SkillScore[],
    thresholds = [65, 70, 75]
  ) {
    return thresholds.map(R => {
      const simulated = skillScores.map(s => {
        const gap = Math.max(0, R - s.currentScore);
        const weightedGap = parseFloat((gap * s.weight).toFixed(2));
        return {
          skillGroupId: s.skillGroupId,
          skillName: s.skillName,
          currentScore: s.currentScore,
          requiredScore: R,
          gap,
          weightedGap,
          isWeak: gap > 0
        };
      });

      const weakSkills = simulated.filter(s => s.isWeak).map(s => s.skillName);
      return {
        threshold: R,
        weakCount: weakSkills.length,
        weakSkills,
        totalWeightedGap: simulated.reduce((acc, cur) => acc + cur.weightedGap, 0)
      };
    });
  }
}
