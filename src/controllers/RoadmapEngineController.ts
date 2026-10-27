// ============================================================================
// CONTROLLER LAYER: ROADMAP ENGINE (ĐỀ XUẤT LỘ TRÌNH HỌC BỔ SUNG CÁ NHÂN HÓA)
// Áp dụng Đồ thị Tiên quyết DAG + Ưu tiên Weighted Gap w(s) * Gap(s) từ mục 7.4
// ============================================================================
import { SkillScore, RoadmapStep, SkillGroup } from '../models/types';
import { StorageModel } from '../models/storage';
import { SEED_SKILL_GROUPS } from '../models/seedSkills';
import { SKILL_RESOURCES } from '../models/seedResources';

export class RoadmapEngineController {
  private static resolveGroups(groups?: SkillGroup[]): SkillGroup[] {
    if (groups && groups.length > 0) return groups;
    try {
      if (typeof StorageModel !== 'undefined' && StorageModel.getSkillGroups) {
        return StorageModel.getSkillGroups();
      }
    } catch {}
    return SEED_SKILL_GROUPS;
  }

  /**
   * Tính toán tầng tiên quyết (Prerequisite Tier) cho từng nhóm kỹ năng
   * Tier 1: Nền tảng độc lập (HTML/CSS, JS, Git, Debug)
   * Tier 2: Phụ thuộc vào Tier 1 (React, API phụ thuộc vào JS)
   */
  private static calculatePrerequisiteTiers(providedGroups?: SkillGroup[]): Record<string, number> {
    const groups = this.resolveGroups(providedGroups);
    const tiers: Record<string, number> = {};

    // Khởi tạo tier = 1 cho các nhóm không có tiên quyết
    groups.forEach(g => {
      tiers[g.id] = g.prerequisites.length === 0 ? 1 : 2;
    });

    // Mở rộng lặp nếu có cây tiên quyết sâu hơn (DAG traversal)
    let changed = true;
    while (changed) {
      changed = false;
      groups.forEach(g => {
        g.prerequisites.forEach(prereqId => {
          const prereqTier = tiers[prereqId] || 1;
          if (tiers[g.id] <= prereqTier) {
            tiers[g.id] = prereqTier + 1;
            changed = true;
          }
        });
      });
    }

    return tiers;
  }

  /**
   * Sinh lộ trình học bổ sung dựa trên kết quả chẩn đoán Gap(s)
   */
  static generateRoadmap(
    skillScores: SkillScore[],
    targetAvailableHours: number = 2.0, // số giờ học/ngày của sinh viên
    customGroups?: SkillGroup[]
  ): RoadmapStep[] {
    const groups = this.resolveGroups(customGroups);
    const tiers = this.calculatePrerequisiteTiers(groups);

    // Lọc ra các nhóm kỹ năng bị hổng (Gap > 0)
    const weakSkills = skillScores.filter(s => s.gap > 0);

    if (weakSkills.length === 0) {
      return [];
    }

    // SẮP XẾP THEO 2 BƯỚC CỦA ĐỀ CƯƠNG:
    // Bước 1: Ưu tiên tầng tiên quyết thấp học trước (tier 1 trước tier 2)
    // Bước 2: Trong cùng một tầng, ưu tiên nhóm có Gap(s) * w(s) lớn hơn
    const sortedSkills = [...weakSkills].sort((a, b) => {
      const tierA = tiers[a.skillGroupId] || 1;
      const tierB = tiers[b.skillGroupId] || 1;

      if (tierA !== tierB) {
        return tierA - tierB;
      }
      return b.weightedGap - a.weightedGap;
    });

    // Tạo các bước học tập cụ thể kèm học liệu và số giờ ước lượng
    const steps: RoadmapStep[] = sortedSkills.map((skill, index) => {
      const groupMeta = groups.find(g => g.id === skill.skillGroupId);
      const resConfig = SKILL_RESOURCES[skill.skillGroupId] || {
        baseHours: 4,
        resources: [],
        exercises: []
      };

      // Ước lượng số giờ học theo mức độ thiếu hụt (Gap)
      // Mức thiếu hụt gap tỉ lệ từ 0 -> 100, nhân với hệ số điều chỉnh
      // Đảm bảo tổng số giờ nằm trong khoảng 10 - 15 giờ trong 7 - 10 ngày
      const severityRatio = Math.max(0.6, Math.min(1.4, skill.gap / 40));
      const estimatedHours = Math.max(2, Math.round(resConfig.baseHours * severityRatio));

      // Xây dựng lý do sư phạm minh bạch
      let reason = '';
      const tier = tiers[skill.skillGroupId] || 1;
      if (tier === 1 && groupMeta && groupMeta.prerequisites.length === 0) {
        reason = `Kỹ năng nền tảng độc lập cần củng cố trước (Mức thiếu hụt: ${skill.gap} điểm, Độ ưu tiên trọng số: ${skill.weightedGap}).`;
      } else {
        const prereqNames = (groupMeta?.prerequisites || [])
          .map(pId => groups.find(g => g.id === pId)?.name || pId)
          .join(', ');
        reason = `Kỹ năng tầng nâng cao (phụ thuộc tiên quyết vào: ${prereqNames}). Học sau khi đã nắm vững nền tảng JavaScript.`;
      }

      return {
        stepNumber: index + 1,
        skillGroupId: skill.skillGroupId,
        skillName: skill.skillName,
        prerequisiteTier: tier,
        gap: skill.gap,
        weightedGap: skill.weightedGap,
        estimatedHours,
        reason,
        learningMaterials: resConfig.resources,
        practiceExercises: resConfig.exercises,
        isCompleted: false
      };
    });

    return steps;
  }

  /**
   * Phân bổ chi tiết lịch học theo từng ngày trong quỹ 7-10 ngày (mục 7.5 đề cương)
   */
  static generateDailySchedule(
    roadmap: RoadmapStep[],
    totalDays: number = 7
  ): {
    day: number;
    title: string;
    targetHours: number;
    skillGroupName: string;
    focusTopics: string[];
    taskDescription: string;
  }[] {
    if (!roadmap || roadmap.length === 0) return [];

    const totalHours = roadmap.reduce((sum, s) => sum + s.estimatedHours, 0);
    const avgDailyHours = parseFloat((totalHours / totalDays).toFixed(1));

    const schedule: {
      day: number;
      title: string;
      targetHours: number;
      skillGroupName: string;
      focusTopics: string[];
      taskDescription: string;
    }[] = [];

    // Phân bổ các bước theo ngày
    let currentStepIdx = 0;
    let stepHoursRemaining = roadmap[0]?.estimatedHours || 0;

    for (let day = 1; day <= totalDays; day++) {
      if (currentStepIdx >= roadmap.length) {
        // Những ngày cuối cùng: Tổng ôn & Chuẩn bị Hậu kiểm
        schedule.push({
          day,
          title: `Ngày ${day}: Ôn tập tổng hợp & Kiểm thử ứng dụng`,
          targetHours: Math.min(2.0, avgDailyHours),
          skillGroupName: 'Tổng ôn tập',
          focusTopics: ['Rà soát mã nguồn Mini Product Catalog', 'Kiểm tra Responsive trên điện thoại', 'Chuẩn bị bài Hậu kiểm (Post-test Đề B)'],
          taskDescription: 'Rà soát lại toàn bộ kiến thức đã bù đắp, kiểm thử ứng dụng mẫu và làm bài kiểm tra đánh giá Đề B.'
        });
        continue;
      }

      const activeStep = roadmap[currentStepIdx];
      const hoursToday = Math.min(avgDailyHours, stepHoursRemaining);
      stepHoursRemaining -= hoursToday;

      const topics = activeStep.learningMaterials.map(m => m.title);
      const isFinishingStep = stepHoursRemaining <= 0;

      schedule.push({
        day,
        title: `Ngày ${day}: ${activeStep.skillName} (Phần ${isFinishingStep ? 'Hoàn thiện & Bài tập' : 'Lý thuyết & Nền tảng'})`,
        targetHours: hoursToday,
        skillGroupName: activeStep.skillName,
        focusTopics: topics.slice(0, 2),
        taskDescription: isFinishingStep
          ? `Làm các bài tập thực hành củng cố cho ${activeStep.skillName} và kiểm tra các tiêu chí hoàn thành.`
          : `Học các tài liệu chọn lọc và xem video chuyên đề về ${activeStep.skillName}.`
      });

      if (isFinishingStep) {
        currentStepIdx++;
        if (currentStepIdx < roadmap.length) {
          stepHoursRemaining = roadmap[currentStepIdx].estimatedHours;
        }
      }
    }

    return schedule;
  }

  /**
   * Kiểm tra tính hợp lệ của lộ trình (Đảm bảo 0% vi phạm quan hệ tiên quyết)
   * Phục vụ Câu hỏi nghiên cứu CH3 trong đề cương
   */
  static validatePrerequisiteIntegrity(roadmap: RoadmapStep[]): {
    isValid: boolean;
    violations: string[];
  } {
    const groups = StorageModel.getSkillGroups();
    const violations: string[] = [];
    const completedSkillIds = new Set<string>();

    for (const step of roadmap) {
      const groupMeta = groups.find(g => g.id === step.skillGroupId);
      if (groupMeta && groupMeta.prerequisites.length > 0) {
        for (const prereqId of groupMeta.prerequisites) {
          // Nếu kỹ năng tiên quyết cũng nằm trong lộ trình cần học,
          // thì nó bắt buộc phải xuất hiện ở bước TRƯỚC bước hiện tại
          const prereqInRoadmap = roadmap.some(s => s.skillGroupId === prereqId);
          if (prereqInRoadmap && !completedSkillIds.has(prereqId)) {
            const prereqName = groups.find(g => g.id === prereqId)?.name || prereqId;
            violations.push(
              `Vi phạm quan hệ tiên quyết: "${step.skillName}" được xếp ở bước ${step.stepNumber} nhưng kỹ năng điều kiện "${prereqName}" chưa hoàn thành trước đó.`
            );
          }
        }
      }
      completedSkillIds.add(step.skillGroupId);
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }
}
