// ============================================================================
// MODEL LAYER: TYPES & INTERFACES
// Đề tài NCKH: Viện Công nghệ thông tin - Trường ĐH Tài chính - Ngân hàng Hà Nội (FBU)
// ============================================================================

export type BloomLevel = 'Nhớ' | 'Hiểu' | 'Vận dụng' | 'Phân tích';
export type Difficulty = 'Dễ' | 'Trung bình' | 'Khó';

export interface SubSkill {
  id: string;
  name: string;
  observableIndicator: string; // Chỉ báo có thể quan sát được
  primarySource: string;       // Nguồn căn cứ (roadmap.sh, tin tuyển dụng,...)
}

export interface SkillGroup {
  id: string;
  code: string;
  name: string;
  description: string;
  initialWeight: number; // Trọng số tham số ban đầu (VD: 0.25 cho JS)
  subSkills: SubSkill[];
  prerequisites: string[]; // Danh sách mã nhóm kỹ năng tiên quyết bắt buộc
}

export interface Question {
  id: string;
  examSet: 'A' | 'B';
  skillGroupId: string;
  subSkillId: string;
  difficulty: Difficulty;
  bloomLevel: BloomLevel;
  content: string;
  codeSnippet?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  twinQuestionId?: string; // ID của câu sinh đôi ở đề còn lại
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  levels: {
    score: 0 | 1 | 2 | 3;
    title: string;
    description: string;
  }[];
}

export interface PracticalSubmission {
  id: string;
  studentId: string;
  submittedAt: string;
  gitRepoUrl: string;
  liveDemoUrl: string;
  commitLogSummary: string;
  notes?: string;
  scores?: {
    evaluatorId: string;
    evaluatorName: string;
    evaluatedAt: string;
    criteriaScores: Record<string, number>; // criterionId -> score (0-3)
    feedback: string;
  }[];
}

export interface ExamAnswer {
  questionId: string;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect?: boolean;
}

export interface SkillScore {
  skillGroupId: string;
  skillName: string;
  weight: number;
  currentScore: number;  // C(s): thang 100
  requiredScore: number; // R(s): thang 100, mặc định 70
  gap: number;           // Gap(s) = max(0, R(s) - C(s))
  weightedGap: number;   // Gap(s) * w(s)
  isWeak: boolean;       // Gap(s) > 0
  isUnassessed?: boolean; // Chưa thực hiện bài thi (VD: hồ sơ mới C03)
  subSkillDetails?: {
    subSkillId: string;
    subSkillName: string;
    correctCount: number;
    totalCount: number;
    percentage: number;
  }[];
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'interactive' | 'doc';
  durationMinutes: number;
  url: string;
  summary: string;
}

export interface RoadmapStep {
  stepNumber: number;
  skillGroupId: string;
  skillName: string;
  prerequisiteTier: number; // Tầng tiên quyết (1, 2, 3...)
  gap: number;
  weightedGap: number;
  estimatedHours: number;
  reason: string;
  learningMaterials: LearningResource[];
  practiceExercises: {
    title: string;
    description: string;
    requirements: string[];
  }[];
  isCompleted?: boolean;
}

export interface DiagnosticReport {
  studentId: string;
  studentCode: string;
  examSet: 'A' | 'B';
  completedAt: string;
  totalScore: number;
  overallRating: 'Chưa đạt yêu cầu' | 'Cần bổ sung một số kỹ năng' | 'Sẵn sàng ứng tuyển thực tập';
  skillScores: SkillScore[];
  roadmap: RoadmapStep[];
  totalRecommendedHours: number;
}

export interface StudentProfile {
  id: string;
  code: string; // VD: FBU-2026-001 (Ẩn danh NCKH)
  name: string;
  classRoom: string;
  targetRole: string; // "Thực tập sinh Frontend"
  availableHoursPerDay: number; // Quỹ thời gian (1-3h/ngày)
  preTestReport?: DiagnosticReport;
  practicalSubmission?: PracticalSubmission;
  postTestReport?: DiagnosticReport;
}

export interface InterviewQuestion {
  id: string;
  skillGroupId: string;
  skillName: string;
  question: string;
  difficulty: 'Cơ bản (Fresher)' | 'Nâng cao (Junior)';
  keyPointsToMention: string[];
  idealAnswer: string;
  commonMistakes: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  source: string;
  jobType: 'Thực tập sinh / Fresher' | 'Có kinh nghiệm (1-2 năm)';
  skillsRequired: Record<string, boolean>; // e.g. G1: true, G2: true, G3: true...
  salaryRange: string;
  keyRequirements: string[];
}

export interface JDMatchResult {
  overallMatchPercentage: number;
  matchedSkills: {
    skillGroupId: string;
    skillName: string;
    required: boolean;
    studentScore: number;
    isReady: boolean;
  }[];
  advice: string;
}

