// ============================================================================
// VIEW COMPONENT: NAVBAR (THANH ĐIỀU HƯỚNG VÀ CHỌN HỒ SƠ THỰC NGHIỆM)
// ============================================================================
import React, { useState, useEffect } from 'react';
import { StorageModel } from '../../models/storage';
import { StudentProfile } from '../../models/types';
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
  Moon
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
            <GraduationCap size={22} color="var(--accent)" />
          </div>
          <div className="brand-text">
            <div className="university-badge">VIỆN CNTT – TRƯỜNG ĐH TÀI CHÍNH – NGÂN HÀNG HÀ NỘI (FBU)</div>
            <h1 className="project-title">
              Mô hình Đánh giá Khoảng cách Kỹ năng & Đề xuất Lộ trình Frontend
            </h1>
          </div>
        </div>

        <div className="header-right-actions">
          <div className="profile-selector-box">
            <UserCheck size={15} color="var(--text-muted)" />
            <span className="profile-label">Hồ sơ:</span>
            <select
              className="student-dropdown"
              value={currentStudent.id}
              onChange={(e) => {
                const selected = students.find(s => s.id === e.target.value);
                if (selected) {
                  StorageModel.setCurrentStudentId(selected.id);
                  onStudentChange(selected);
                }
              }}
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`}
          >
            {theme === 'dark' ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="var(--accent)" />}
            <span className="theme-toggle-label">
              {theme === 'dark' ? 'Giao diện Tối' : 'Giao diện Sáng'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="header-navigation-tabs">
        <div className="tab-group">
          <span className="tab-group-title">
            <GraduationCap size={14} /> DÀNH CHO SINH VIÊN
          </span>
          <button
            className={`nav-tab-btn ${currentTab === 'assessment' ? 'active' : ''}`}
            onClick={() => onTabChange('assessment')}
          >
            <ClipboardCheck size={16} /> Làm bài đánh giá
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'diagnostic' ? 'active' : ''}`}
            onClick={() => onTabChange('diagnostic')}
          >
            <LineChart size={16} /> Báo cáo Chẩn đoán
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => onTabChange('roadmap')}
          >
            <MapPin size={16} /> Lộ trình học tương tác
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'practical' ? 'active' : ''}`}
            onClick={() => onTabChange('practical')}
          >
            <Code2 size={16} /> Bài thực hành & Git
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'jobMatcher' ? 'active' : ''}`}
            onClick={() => onTabChange('jobMatcher')}
          >
            <Briefcase size={16} /> Đối sánh 12 JD TopCV
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'mockInterview' ? 'active' : ''}`}
            onClick={() => onTabChange('mockInterview')}
          >
            <MessageSquare size={16} /> Luyện phỏng vấn Tech
          </button>
        </div>

        <div className="tab-divider"></div>

        <div className="tab-group">
          <span className="tab-group-title">
            <FlaskConical size={14} /> NGHIÊN CỨU & GIẢNG VIÊN
          </span>
          <button
            className={`nav-tab-btn ${currentTab === 'questionBank' ? 'active' : ''}`}
            onClick={() => onTabChange('questionBank')}
          >
            <Database size={16} /> Ngân hàng 120 câu
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'blindGrading' ? 'active' : ''}`}
            onClick={() => onTabChange('blindGrading')}
          >
            <ClipboardCheck size={16} /> Chấm mù Rubric
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'comparative' ? 'active' : ''}`}
            onClick={() => onTabChange('comparative')}
          >
            <Users size={16} /> Đối chiếu Hồ sơ A/B
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'analytics' ? 'active' : ''}`}
            onClick={() => onTabChange('analytics')}
          >
            <LineChart size={16} /> Thống kê NCKH
          </button>
          <button
            className={`nav-tab-btn ${currentTab === 'settings' ? 'active' : ''}`}
            onClick={() => onTabChange('settings')}
          >
            <Sliders size={16} /> Độ nhạy & Trọng số
          </button>
        </div>
      </nav>
    </header>
  );
};
