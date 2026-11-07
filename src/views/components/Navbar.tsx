// ============================================================================
// VIEW COMPONENT: NAVBAR (THANH ĐIỀU HƯỚNG VÀ CHỌN HỒ SƠ THỰC NGHIỆM)
// ============================================================================
import React, { useState, useEffect } from 'react';
import { StorageModel } from '../../models/storage';
import { StudentProfile } from '../../models/types';
import { ProfileDropdown } from './ProfileDropdown';
import { 
  GraduationCap, 
  FlaskConical, 
  ClipboardCheck, 
  LineChart, 
  MapPin, 
  Code2, 
  Database, 
  Sliders, 
  UserCheck,
  Briefcase,
  MessageSquare,
  Users,
  Sun,
  Moon,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentStudent: StudentProfile;
  onStudentChange: (student: StudentProfile) => void;
  students: StudentProfile[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  currentStudent,
  onStudentChange,
  students
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('fbu_nckh_theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fbu_nckh_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="app-header">
      {/* Top row: Brand on left, Profile & Theme on right */}
      <div className="header-top-row">
        <div className="header-brand-section">
          <div className="brand-logo-badge">
            <GraduationCap size={22} className="brand-icon" />
            <div className="brand-logo-glow"></div>
          </div>
          <div className="brand-text">
            <div className="university-badge">
              <Sparkles size={11} className="badge-sparkle-icon" />
              VIỆN CNTT – TRƯỜNG ĐH TÀI CHÍNH – NGÂN HÀNG HÀ NỘI (FBU)
            </div>
            <h1 className="project-title">
              Mô hình Đánh giá Khoảng cách Kỹ năng & Đề xuất Lộ trình Frontend
            </h1>
          </div>
        </div>

        <div className="header-right-actions">
          <ProfileDropdown
            currentStudent={currentStudent}
            students={students}
            onSelectStudent={(selected) => {
              StorageModel.setCurrentStudentId(selected.id);
              onStudentChange(selected);
            }}
            variant="navbar"
          />

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`}
          >
            {theme === 'dark' ? (
              <Sun size={15} color="#f59e0b" className="theme-icon spin-on-hover" />
            ) : (
              <Moon size={15} color="var(--accent)" className="theme-icon spin-on-hover" />
            )}
            <span className="theme-toggle-label">
              {theme === 'dark' ? 'Giao diện Tối' : 'Giao diện Sáng'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="header-navigation-tabs" aria-label="Thanh điều hướng chính">
        <div className="tab-group">
          <span className="tab-group-title">
            <GraduationCap size={13} /> DÀNH CHO SINH VIÊN
          </span>
          <button
            className={`nav-tab-btn ${currentTab === 'assessment' ? 'active' : ''}`}
            onClick={() => onTabChange('assessment')}
          >
            <ClipboardCheck size={15} />
            <span>Làm bài đánh giá</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'diagnostic' ? 'active' : ''}`}
            onClick={() => onTabChange('diagnostic')}
          >
            <LineChart size={15} />
            <span>Báo cáo Chẩn đoán</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => onTabChange('roadmap')}
          >
            <MapPin size={15} />
            <span>Lộ trình học tương tác</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'practical' ? 'active' : ''}`}
            onClick={() => onTabChange('practical')}
          >
            <Code2 size={15} />
            <span>Bài thực hành & Git</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'jobMatcher' ? 'active' : ''}`}
            onClick={() => onTabChange('jobMatcher')}
          >
            <Briefcase size={15} />
            <span>Đối sánh 12 JD TopCV</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'mockInterview' ? 'active' : ''}`}
            onClick={() => onTabChange('mockInterview')}
          >
            <MessageSquare size={15} />
            <span>Luyện phỏng vấn Tech</span>
          </button>
        </div>

        <div className="tab-divider"></div>

        <div className="tab-group">
          <span className="tab-group-title">
            <FlaskConical size={13} /> NGHIÊN CỨU & GIẢNG VIÊN
          </span>
          <button
            className={`nav-tab-btn ${currentTab === 'questionBank' ? 'active' : ''}`}
            onClick={() => onTabChange('questionBank')}
          >
            <Database size={15} />
            <span>Ngân hàng 120 câu</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'blindGrading' ? 'active' : ''}`}
            onClick={() => onTabChange('blindGrading')}
          >
            <ClipboardCheck size={15} />
            <span>Chấm mù Rubric</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'comparative' ? 'active' : ''}`}
            onClick={() => onTabChange('comparative')}
          >
            <Users size={15} />
            <span>Đối chiếu Hồ sơ A/B</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'analytics' ? 'active' : ''}`}
            onClick={() => onTabChange('analytics')}
          >
            <LineChart size={15} />
            <span>Thống kê NCKH</span>
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'settings' ? 'active' : ''}`}
            onClick={() => onTabChange('settings')}
          >
            <Sliders size={15} />
            <span>Độ nhạy & Trọng số</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
