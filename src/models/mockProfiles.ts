// ============================================================================
// MODEL LAYER: HỒ SƠ SINH VIÊN MẪU (BẢNG 6 TRONG ĐỀ CƯƠNG NGHIÊN CỨU)
// ============================================================================
import { StudentProfile } from './types';
import { GapDiagnosticController } from '../controllers/GapDiagnosticController';
import { RoadmapEngineController } from '../controllers/RoadmapEngineController';
import { SEED_SKILL_GROUPS } from './seedSkills';

export function getInitialMockProfiles(): StudentProfile[] {
  // Sinh dữ liệu cho Hồ sơ A: HTML/CSS: 80, JS & DOM: 40, React: 35, API: 45, Git: 75, Debug: 50
  const scoresA = GapDiagnosticController.createFromPresetScores(
    { G1: 80, G2: 40, G3: 35, G4: 45, G5: 75, G6: 50 },
    70,
    SEED_SKILL_GROUPS
  );
  const roadmapA = RoadmapEngineController.generateRoadmap(scoresA, 2.0, SEED_SKILL_GROUPS);

  // Sinh dữ liệu cho Hồ sơ B: HTML/CSS: 55, JS & DOM: 78, React: 72, API: 68, Git: 30, Debug: 42
  const scoresB = GapDiagnosticController.createFromPresetScores(
    { G1: 55, G2: 78, G3: 72, G4: 68, G5: 30, G6: 42 },
    70,
    SEED_SKILL_GROUPS
  );
  const roadmapB = RoadmapEngineController.generateRoadmap(scoresB, 1.5, SEED_SKILL_GROUPS);

  return [
    {
      id: 'STU_001',
      code: 'FBU-2026-A01',
      name: 'Nguyễn Văn A (Hồ sơ A mẫu)',
      classRoom: 'D.12.48.01',
      targetRole: 'Thực tập sinh Frontend',
      availableHoursPerDay: 2.0,
      preTestReport: {
        studentId: 'STU_001',
        studentCode: 'FBU-2026-A01',
        examSet: 'A',
        completedAt: '2026-10-25 10:15',
        totalScore: 54,
        overallRating: 'Cần bổ sung một số kỹ năng',
        skillScores: scoresA,
        roadmap: roadmapA,
        totalRecommendedHours: roadmapA.reduce((sum, s) => sum + s.estimatedHours, 0)
      },
      practicalSubmission: {
        id: 'SUB_001',
        studentId: 'STU_001',
        submittedAt: '2026-10-25 14:30',
        gitRepoUrl: 'https://github.com/fbu-student-a/mini-product-catalog',
        liveDemoUrl: 'https://mini-product-catalog-a.vercel.app',
        commitLogSummary: 'feat: setup project, add header, style responsive grid, attempt async fetch, fix minor bug',
        notes: 'Em làm xong phần giao diện và CSS khá nhanh, nhưng khi gọi API và truyền state trong React còn bị lỗi giật màn hình.',
        scores: [
          {
            evaluatorId: 'EVAL_01',
            evaluatorName: 'ThS. Nguyễn Thanh Tuyên (Giảng viên hướng dẫn)',
            evaluatedAt: '2026-10-26 09:15',
            criteriaScores: {
              CRIT_1: 1, // Chức năng: 1
              CRIT_2: 1, // Cấu trúc mã: 1
              CRIT_3: 2  // Git & lỗi: 2
            },
            feedback: 'Giao diện HTML/CSS bắt mắt, responsive tốt. Tuy nhiên tư duy React Component và xử lý bất đồng bộ ES6 còn non, cần bổ sung gấp JavaScript nền tảng.'
          }
        ]
      }
    },
    {
      id: 'STU_002',
      code: 'FBU-2026-B02',
      name: 'Trần Thị B (Hồ sơ B mẫu)',
      classRoom: 'D.12.48.01',
      targetRole: 'Thực tập sinh Frontend',
      availableHoursPerDay: 1.5,
      preTestReport: {
        studentId: 'STU_002',
        studentCode: 'FBU-2026-B02',
        examSet: 'A',
        completedAt: '2026-10-25 11:30',
        totalScore: 62,
        overallRating: 'Cần bổ sung một số kỹ năng',
        skillScores: scoresB,
        roadmap: roadmapB,
        totalRecommendedHours: roadmapB.reduce((sum, s) => sum + s.estimatedHours, 0)
      },
      practicalSubmission: {
        id: 'SUB_002',
        studentId: 'STU_002',
        submittedAt: '2026-10-25 18:20',
        gitRepoUrl: 'https://github.com/fbu-student-b/catalog-app',
        liveDemoUrl: 'https://catalog-app-b.netlify.app',
        commitLogSummary: 'init commit, update code, final commit',
        notes: 'Code logic JS chạy tốt nhưng em chưa quen dùng Git phân nhánh, giao diện điện thoại còn bị tràn viền một chút.',
        scores: [
          {
            evaluatorId: 'EVAL_01',
            evaluatorName: 'ThS. Nguyễn Thanh Tuyên (Giảng viên hướng dẫn)',
            evaluatedAt: '2026-10-26 10:45',
            criteriaScores: {
              CRIT_1: 2, // Chức năng: 2
              CRIT_2: 2, // Cấu trúc mã: 2
              CRIT_3: 0  // Git/lỗi: 0 (Yếu Git)
            },
            feedback: 'Khả năng viết logic JavaScript và React khá trôi chảy. Yếu điểm chí mạng là kỹ năng Git và quy trình gỡ lỗi chuyên nghiệp.'
          }
        ]
      }
    },
    {
      id: 'STU_003',
      code: 'FBU-2026-C03',
      name: 'Lê Văn C (Thực nghiệm mới)',
      classRoom: 'D.12.48.01',
      targetRole: 'Thực tập sinh Frontend',
      availableHoursPerDay: 2.0
    }
  ];
}

export const MOCK_STUDENT_PROFILES: StudentProfile[] = getInitialMockProfiles();
