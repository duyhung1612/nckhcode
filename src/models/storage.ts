// ============================================================================
// MODEL LAYER: STORAGE & REPOSITORY (LOCALSTORAGE PERSISTENCE)
// ============================================================================
import { StudentProfile, DiagnosticReport, PracticalSubmission, SkillGroup } from './types';
import { getInitialMockProfiles } from './mockProfiles';
import { SEED_SKILL_GROUPS } from './seedSkills';

const KEYS = {
  STUDENTS: 'fbu_nckh_students_v1',
  CURRENT_STUDENT_ID: 'fbu_nckh_current_student_id_v1',
  SYSTEM_THRESHOLD: 'fbu_nckh_system_threshold_v1', // R(s) mặc định 70
  SKILL_GROUPS: 'fbu_nckh_skill_groups_v1',
};

export class StorageModel {
  private static sanitizeStudent(s: StudentProfile): StudentProfile {
    if (s.preTestReport?.skillScores) {
      const seen = new Set<string>();
      s.preTestReport.skillScores = s.preTestReport.skillScores.filter(item => {
        const id = item.skillGroupId || item.skillName;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      }).slice(0, 6);
    }
    if (s.postTestReport?.skillScores) {
      const seen = new Set<string>();
      s.postTestReport.skillScores = s.postTestReport.skillScores.filter(item => {
        const id = item.skillGroupId || item.skillName;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      }).slice(0, 6);
    }
    return s;
  }

  static getStudents(): StudentProfile[] {
    const raw = localStorage.getItem(KEYS.STUDENTS);
    const initial = getInitialMockProfiles().map(s => this.sanitizeStudent(s));

    if (!raw) {
      this.saveStudents(initial);
      return initial;
    }
    try {
      const list: StudentProfile[] = JSON.parse(raw);
      // Đảm bảo hồ sơ mẫu Nguyễn Văn A (STU_001) luôn được khôi phục nguyên vẹn theo chuẩn Bảng 6 đề cương
      const stuA = initial.find(s => s.id === 'STU_001');
      const idxA = list.findIndex(s => s.id === 'STU_001');
      if (stuA) {
        if (idxA >= 0) {
          list[idxA] = stuA;
        } else {
          list.unshift(stuA);
        }
      }
      const sanitized = list.map(s => this.sanitizeStudent(s));
      this.saveStudents(sanitized);
      return sanitized;
    } catch {
      this.saveStudents(initial);
      return initial;
    }
  }

  // Khôi phục một hồ sơ mẫu về trạng thái gốc chuẩn NCKH (Bảng 6 đề cương)
  static resetStudentToInitial(studentId: string = 'STU_001'): StudentProfile {
    const initialProfiles = getInitialMockProfiles().map(s => this.sanitizeStudent(s));
    const target = initialProfiles.find(s => s.id === studentId) || initialProfiles[0];
    
    const students = this.getStudents();
    const idx = students.findIndex(s => s.id === target.id);
    if (idx >= 0) {
      students[idx] = target;
    } else {
      students.push(target);
    }
    this.saveStudents(students);
    return target;
  }

  // Khôi phục toàn bộ các hồ sơ mẫu về chuẩn NCKH
  static restoreAllSampleProfiles(): StudentProfile[] {
    const initial = getInitialMockProfiles().map(s => this.sanitizeStudent(s));
    this.saveStudents(initial);
    return initial;
  }

  static saveStudents(students: StudentProfile[]): void {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  }

  static getStudentById(id: string): StudentProfile | undefined {
    return this.getStudents().find(s => s.id === id);
  }

  static updateStudent(student: StudentProfile): void {
    const students = this.getStudents();
    const index = students.findIndex(s => s.id === student.id);
    if (index >= 0) {
      students[index] = student;
    } else {
      students.push(student);
    }
    this.saveStudents(students);
  }

  static getCurrentStudentId(): string {
    return localStorage.getItem(KEYS.CURRENT_STUDENT_ID) || 'STU_001';
  }

  static setCurrentStudentId(id: string): void {
    localStorage.setItem(KEYS.CURRENT_STUDENT_ID, id);
  }

  // Ngưỡng đạt yêu cầu R(s) - Tham số thử nghiệm (mặc định 70, thử nghiệm 65/70/75)
  static getRequiredThreshold(): number {
    const val = localStorage.getItem(KEYS.SYSTEM_THRESHOLD);
    return val ? parseInt(val, 10) : 70;
  }

  static setRequiredThreshold(threshold: number): void {
    localStorage.setItem(KEYS.SYSTEM_THRESHOLD, threshold.toString());
  }

  // Khung kỹ năng & Trọng số
  static getSkillGroups(): SkillGroup[] {
    const raw = localStorage.getItem(KEYS.SKILL_GROUPS);
    if (!raw) {
      this.saveSkillGroups(SEED_SKILL_GROUPS);
      return SEED_SKILL_GROUPS;
    }
    try {
      const list: SkillGroup[] = JSON.parse(raw);
      const seen = new Set<string>();
      return list.filter(g => {
        if (!g.id || seen.has(g.id)) return false;
        seen.add(g.id);
        return true;
      }).slice(0, 6);
    } catch {
      return SEED_SKILL_GROUPS;
    }
  }

  static saveSkillGroups(groups: SkillGroup[]): void {
    localStorage.setItem(KEYS.SKILL_GROUPS, JSON.stringify(groups));
  }

  // Reset to default seed
  static resetToDefault(): void {
    localStorage.removeItem(KEYS.STUDENTS);
    localStorage.removeItem(KEYS.SYSTEM_THRESHOLD);
    localStorage.removeItem(KEYS.SKILL_GROUPS);
    this.saveStudents(getInitialMockProfiles());
    this.saveSkillGroups(SEED_SKILL_GROUPS);
  }
}
