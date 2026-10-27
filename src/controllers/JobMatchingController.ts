// ============================================================================
// CONTROLLER LAYER: JOB MATCHING CONTROLLER (ĐỐI SÁNH NĂNG LỰC VỚI TIN TUYỂN DỤNG)
// Quét từ khóa JD thực tế & đối sánh mức sẵn sàng ứng tuyển theo khảo sát TopCV
// ============================================================================
import { JobPosting, JDMatchResult, SkillScore } from '../models/types';
import { SEED_SKILL_GROUPS } from '../models/seedSkills';

export class JobMatchingController {
  private static KEYWORD_MAP: Record<string, string[]> = {
    G1: ['html', 'css', 'responsive', 'flexbox', 'grid', 'ui', 'scss', 'bootstrap', 'tailwind'],
    G2: ['javascript', 'js', 'es6', 'dom', 'typescript', 'closure', 'event', 'ecmascript'],
    G3: ['react', 'reactjs', 'hooks', 'redux', 'zustand', 'component', 'props', 'state', 'jsx'],
    G4: ['api', 'rest', 'restful', 'fetch', 'axios', 'async', 'await', 'promise', 'json', 'http'],
    G5: ['git', 'github', 'gitlab', 'branch', 'merge', 'conflict', 'commit', 'devtools'],
    G6: ['debug', 'test', 'testing', 'unit test', 'jest', 'vitest', 'bug', 'console']
  };

  /**
   * Quét và trích xuất kỹ năng yêu cầu từ một đoạn văn bản JD bất kỳ
   */
  static scanJobDescriptionText(jdText: string): Record<string, boolean> {
    const textLower = jdText.toLowerCase();
    const detected: Record<string, boolean> = {};

    for (const [groupId, keywords] of Object.entries(this.KEYWORD_MAP)) {
      detected[groupId] = keywords.some(kw => textLower.includes(kw));
    }

    return detected;
  }

  /**
   * Tính toán độ tương thích (Match Rate %) giữa Hồ sơ sinh viên và Tin tuyển dụng
   */
  static matchStudentWithJob(
    job: JobPosting,
    studentScores: SkillScore[]
  ): JDMatchResult {
    let totalRequiredWeight = 0;
    let earnedWeight = 0;

    const matchedSkills = SEED_SKILL_GROUPS.map(group => {
      const isRequired = !!job.skillsRequired[group.id];
      const studentScoreObj = studentScores.find(s => s.skillGroupId === group.id);
      const studentScore = studentScoreObj?.currentScore ?? 0;
      const isReady = studentScore >= 70;

      if (isRequired) {
        totalRequiredWeight += group.initialWeight;
        // Điểm đạt được theo tỷ lệ hoàn thành (tối đa 100%)
        const ratio = Math.min(1.0, studentScore / 70);
        earnedWeight += group.initialWeight * ratio;
      }

      return {
        skillGroupId: group.id,
        skillName: group.name,
        required: isRequired,
        studentScore,
        isReady
      };
    });

    const overallMatchPercentage = totalRequiredWeight > 0
      ? Math.round((earnedWeight / totalRequiredWeight) * 100)
      : 80;

    let advice = '';
    const missingCrucialSkills = matchedSkills.filter(s => s.required && !s.isReady);

    if (missingCrucialSkills.length === 0) {
      advice = '🎉 Chúc mừng! Năng lực hiện tại của bạn đáp ứng xuất sắc toàn bộ yêu cầu của vị trí này. Hãy tự tin gửi CV ứng tuyển ngay!';
    } else {
      const missingNames = missingCrucialSkills.map(s => s.skillName).join(', ');
      advice = `⚠️ Bạn cần hoàn thành các chặng học bổ sung cho [${missingNames}] để nâng mức độ tương thích từ ${overallMatchPercentage}% lên trên 85% trước khi phỏng vấn.`;
    }

    return {
      overallMatchPercentage,
      matchedSkills,
      advice
    };
  }
}
