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
  static getStudents(): StudentProfile[] {
    const raw = localStorage.getItem(KEYS.STUDENTS);
    if (!raw) {
      const initial = getInitialMockProfiles();
      this.saveStudents(initial);
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return getInitialMockProfiles();
    }
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
      return JSON.parse(raw);
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
