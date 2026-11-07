// ============================================================================
// APP ROOT CONTROLLER / VIEW COORDINATOR (MÔ HÌNH MVC)
// Đề tài NCKH Viện CNTT FBU
// ============================================================================
import React, { useState, useEffect, useRef } from 'react';
import { StorageModel } from './models/storage';
import { StudentProfile } from './models/types';
import { Navbar } from './views/components/Navbar';
import { ErrorBoundary } from './views/components/ErrorBoundary';
import { animatePageEntrance } from './utils/motion';

// Views
import { AssessmentView } from './views/student/AssessmentView';
import { DiagnosticReportView } from './views/student/DiagnosticReportView';
import { InteractiveRoadmapView } from './views/student/InteractiveRoadmapView';
import { PracticalSubmitView } from './views/student/PracticalSubmitView';
import { JobMatcherView } from './views/student/JobMatcherView';
import { MockInterviewView } from './views/student/MockInterviewView';
import { QuestionBankView } from './views/admin/QuestionBankView';
import { BlindGradingView } from './views/admin/BlindGradingView';
import { ComparativeStudyView } from './views/admin/ComparativeStudyView';
import { ResearchDashboardView } from './views/admin/ResearchDashboardView';
import { ParameterSettingsView } from './views/admin/ParameterSettingsView';

export function App() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('diagnostic'); // Mặc định mở Báo cáo Chẩn đoán
  const mainContentRef = useRef<HTMLElement | null>(null);

  // Tải dữ liệu ban đầu
  const refreshData = () => {
    const list = StorageModel.getStudents();
    setStudents(list);
    const activeId = StorageModel.getCurrentStudentId();
    const active = list.find(s => s.id === activeId) || list[0];
    setCurrentStudent(active);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // GSAP Smooth spatial tab transition
  useEffect(() => {
    if (mainContentRef.current) {
      animatePageEntrance(mainContentRef.current);
    }
  }, [currentTab]);

  if (!currentStudent) {
    return <div className="loading-screen">Đang khởi tạo hệ thống NCKH...</div>;
  }

  return (
    <div className="app-layout">
      {/* Antigravity Ambient Spatial Lighting Background */}
      <div className="spatial-bg-ambient" aria-hidden="true">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
        <div className="spatial-grid-overlay"></div>
      </div>

      {/* Navbar & Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        currentStudent={currentStudent}
        onStudentChange={(stu) => {
          setCurrentStudent(stu);
          StorageModel.setCurrentStudentId(stu.id);
        }}
        students={students}
      />

      {/* Main View Workspace */}
      <main className="app-main-content" ref={mainContentRef}>
        <ErrorBoundary>
        {currentTab === 'assessment' && (
          <AssessmentView
            student={currentStudent}
            onExamCompleted={() => {
              refreshData();
              setCurrentTab('diagnostic');
            }}
          />
        )}

        {currentTab === 'diagnostic' && (
          <DiagnosticReportView
            student={currentStudent}
            onNavigateToRoadmap={() => setCurrentTab('roadmap')}
            onRetakeExam={() => setCurrentTab('assessment')}
            students={students}
            onStudentChange={(stu) => {
              setCurrentStudent(stu);
              StorageModel.setCurrentStudentId(stu.id);
            }}
          />
        )}

        {currentTab === 'roadmap' && (
          <InteractiveRoadmapView
            student={currentStudent}
            onStartPostTest={() => setCurrentTab('assessment')}
          />
        )}

        {currentTab === 'practical' && (
          <PracticalSubmitView
            student={currentStudent}
            onSubmitted={() => refreshData()}
          />
        )}

        {currentTab === 'jobMatcher' && (
          <JobMatcherView student={currentStudent} />
        )}

        {currentTab === 'mockInterview' && (
          <MockInterviewView />
        )}

        {currentTab === 'questionBank' && <QuestionBankView />}

        {currentTab === 'blindGrading' && (
          <BlindGradingView onGradingCompleted={() => refreshData()} />
        )}

        {currentTab === 'comparative' && (
          <ComparativeStudyView />
        )}

        {currentTab === 'analytics' && <ResearchDashboardView />}

        {currentTab === 'settings' && (
          <ParameterSettingsView onSettingsChanged={() => refreshData()} />
        )}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <strong>Đề tài Nghiên cứu Khoa học Sinh viên 2026–2027</strong> • Viện Công nghệ thông tin – Trường ĐH Tài chính – Ngân hàng Hà Nội (FBU)
          </p>
          <p className="footer-sub">
            Nhóm sinh viên nghiên cứu: <strong>Nguyễn Duy Hưng (Trưởng nhóm), Nguyễn Hải Đăng</strong> • GVHD: <strong>Nguyễn Thanh Tuyên</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
