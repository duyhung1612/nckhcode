// ============================================================================
// VIEW COMPONENT: NAVBAR (THANH ĐIỀU HƯỚNG VÀ CHỌN HỒ SƠ THỰC NGHIỆM)
// Refactored header with LucianLabs #027 Search, #354 Morphing Mega-Menu & #037 Profile Switcher
// ============================================================================
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { StorageModel } from '../../models/storage';
import { StudentProfile } from '../../models/types';
import { ProfileDropdown } from './ProfileDropdown';
import { ExpandingSearch } from './ExpandingSearch';
import './Navbar.css';
import { 
  GraduationCap, 
  FlaskConical, 
  ClipboardCheck, 
  LineChart, 
  MapPin, 
  Code2, 
  Database, 
  Sliders, 
  Users,
  Sun, 
  Moon, 
  ChevronDown, 
  Sparkles,
  Check,
  Briefcase,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentStudent: StudentProfile;
  onStudentChange: (student: StudentProfile) => void;
  students: StudentProfile[];
}

// 6 bước hành trình chuẩn của sinh viên
const STUDENT_STEPS = [
  { id: 'assessment', stepNum: 1, label: 'Làm bài đánh giá' },
  { id: 'diagnostic', stepNum: 2, label: 'Báo cáo Chẩn đoán' },
  { id: 'roadmap', stepNum: 3, label: 'Lộ trình học tương tác' },
  { id: 'practical', stepNum: 4, label: 'Bài thực hành & Git' },
  { id: 'jobMatcher', stepNum: 5, label: 'Đối sánh 12 JD TopCV' },
  { id: 'mockInterview', stepNum: 6, label: 'Luyện phỏng vấn Tech' }
];

// 5 tab chức năng nghiên cứu & giảng viên (LucianLabs #354)
const RESEARCH_TABS = [
  {
    id: 'questionBank',
    title: 'Ngân hàng 120 câu',
    desc: 'Ma trận Bloom & đề A/B sinh đôi',
    icon: Database,
    color: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
  },
  {
    id: 'blindGrading',
    title: 'Chấm mù Rubric',
    desc: 'Đánh giá độc lập 2 chuyên gia',
    icon: ClipboardCheck,
    color: 'linear-gradient(135deg, #6366F1, #4338CA)'
  },
  {
    id: 'comparative',
    title: 'Đối chiếu Hồ sơ A/B',
    desc: 'Phân tích chéo hồ sơ thực nghiệm',
    icon: Users,
    color: 'linear-gradient(135deg, #14B8A6, #0F766E)'
  },
  {
    id: 'analytics',
    title: 'Thống kê NCKH',
    desc: 'Đo lường tiến bộ tiền/hậu kiểm',
    icon: LineChart,
    color: 'linear-gradient(135deg, #F43F5E, #BE123C)'
  },
  {
    id: 'settings',
    title: 'Độ nhạy & Trọng số',
    desc: 'Cấu hình tham số ngưỡng R(s)',
    icon: Sliders,
    color: 'linear-gradient(135deg, #64748B, #334155)'
  }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  currentStudent,
  onStudentChange,
  students
}) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('fbu_nckh_theme') as 'dark' | 'light') || 'dark';
  });

  // UI state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  // Refs
  const lastScrollY = useRef(0);
  const megaContainerRef = useRef<HTMLDivElement>(null);
  const megaTriggerBtnRef = useRef<HTMLButtonElement>(null);
  const megaCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sliding pill position state
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0
  });

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fbu_nckh_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Đóng Research Menu khi currentTab thay đổi (từ Stepper, Search, hoặc bất kỳ nơi nào)
  useEffect(() => {
    setIsMegaOpen(false);
  }, [currentTab]);

  // Scroll detection: Đóng menu ngay khi cuộn và điều khiển ẩn/hiện header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Khi người dùng cuộn trang: đóng ngay menu nghiên cứu
      setIsMegaOpen(false);

      // 2. Gần đỉnh trang luôn hiện header
      if (currentScrollY <= 50) {
        setIsHeaderHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // 3. Nếu ô tìm kiếm đang mở, giữ header hiện để không ngắt trải nghiệm nhập liệu
      if (isSearchOpen) {
        setIsHeaderHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // 4. Cuộn xuống -> ẩn header; cuộn lên -> hiện header
      if (currentScrollY > lastScrollY.current + 8) {
        setIsHeaderHidden(true);
      } else if (currentScrollY < lastScrollY.current - 8) {
        setIsHeaderHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearchOpen]);

  // Click outside listener for Research Mega-Menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaContainerRef.current && !megaContainerRef.current.contains(e.target as Node)) {
        setIsMegaOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMegaOpen) {
        setIsMegaOpen(false);
        megaTriggerBtnRef.current?.focus({ preventScroll: true });
      }
    };

    if (isMegaOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMegaOpen]);

  // Quản lý hover leave / enter với 220ms delay chuẩn LucianLabs #354
  const handleMegaPointerEnter = () => {
    if (megaCloseTimerRef.current) {
      clearTimeout(megaCloseTimerRef.current);
      megaCloseTimerRef.current = null;
    }
  };

  const handleMegaPointerLeave = () => {
    if (isMegaOpen) {
      megaCloseTimerRef.current = setTimeout(() => {
        setIsMegaOpen(false);
      }, 220);
    }
  };

  // Tính toán vị trí sliding pill cho stepper
  const updatePillPosition = () => {
    const activeIdx = STUDENT_STEPS.findIndex(s => s.id === currentTab);
    if (activeIdx !== -1 && stepRefs.current[activeIdx]) {
      const el = stepRefs.current[activeIdx]!;
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  };

  useLayoutEffect(() => {
    updatePillPosition();
  }, [currentTab]);

  useEffect(() => {
    window.addEventListener('resize', updatePillPosition);
    return () => window.removeEventListener('resize', updatePillPosition);
  }, []);

  // Kiểm tra bước đã hoàn thành từ dữ liệu thật trong StorageModel / currentStudent
  const checkStepDone = (stepId: string): boolean => {
    if (stepId === 'assessment') {
      return Boolean(currentStudent?.preTestReport || currentStudent?.postTestReport);
    }
    if (stepId === 'diagnostic') {
      return Boolean(currentStudent?.preTestReport);
    }
    if (stepId === 'roadmap') {
      return Boolean(currentStudent?.preTestReport?.roadmap?.some(s => s.isCompleted));
    }
    if (stepId === 'practical') {
      return Boolean(currentStudent?.practicalSubmission);
    }
    // jobMatcher và mockInterview: không bịa tiến độ khi chưa có dữ liệu hoàn thành
    return false;
  };

  const isResearchTabActive = RESEARCH_TABS.some(tab => tab.id === currentTab);

  return (
    <header 
      className={`app-header ${isHeaderHidden ? 'header-hidden' : ''} ${isSearchOpen ? 'is-search-open' : ''}`}
    >
      {/* ===================================================================
          HÀNG 1: BRAND KHỐI MỚI (EYEBROW + TIÊU ĐỀ 1 DÒNG), SEARCH, PROFILE, THEME
          =================================================================== */}
      <div className="header-top-row">
        {/* Brand Section: Logo + Eyebrow 1 dòng + Tiêu đề vừa 1 dòng */}
        <div className="header-brand-section">
          <div className="brand-logo-badge">
            <GraduationCap size={22} className="brand-icon" />
            <div className="brand-logo-glow"></div>
          </div>
          <div className="brand-text">
            {/* Eyebrow nhỏ, giãn chữ, muted, 1 dòng (ẩn ở mobile) */}
            <div className="university-badge">
              <Sparkles size={11} className="badge-sparkle-icon" />
              <span>VIỆN CNTT – TRƯỜNG ĐH TÀI CHÍNH – NGÂN HÀNG HÀ NỘI (FBU)</span>
            </div>
            {/* Tiêu đề ngắn gọn, vừa vặn 1 dòng trên desktop */}
            <h1 className="project-title">
              Đánh giá Khoảng cách Kỹ năng Frontend
            </h1>
          </div>
        </div>

        {/* Cụm hành động bên phải: Search #027, Profile #037, Theme Icon */}
        <div className="header-right-actions">
          {/* Ô tìm kiếm LucianLabs #027 */}
          <ExpandingSearch
            onNavigate={(targetTab) => {
              onTabChange(targetTab);
              setIsSearchOpen(false);
            }}
            onOpenChange={setIsSearchOpen}
          />

          {/* ProfileDropdown LucianLabs #037 */}
          <ProfileDropdown
            currentStudent={currentStudent}
            students={students}
            onSelectStudent={(selected) => {
              StorageModel.setCurrentStudentId(selected.id);
              onStudentChange(selected);
            }}
            variant="navbar"
            currentTab={currentTab}
          />

          {/* Nút đổi theme chỉ còn icon */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn icon-only"
            title={`Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`}
            aria-label={`Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`}
          >
            {theme === 'dark' ? (
              <Sun size={17} color="#f59e0b" className="theme-icon spin-on-hover" />
            ) : (
              <Moon size={17} color="var(--accent)" className="theme-icon spin-on-hover" />
            )}
          </button>
        </div>
      </div>

      {/* ===================================================================
          HÀNG 2: STEPPER 6 BƯỚC CHO SINH VIÊN + MEGA-MENU NGHIÊN CỨU #354
          =================================================================== */}
      <div className="navbar-bottom-row">
        {/* Stepper 6 bước cho sinh viên */}
        <nav 
          className="student-stepper-container" 
          aria-label="Hành trình đánh giá và học bổ sung của sinh viên"
        >
          {/* Active Sliding Pill */}
          <div 
            className="stepper-sliding-pill"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity
            }}
            aria-hidden="true"
          />

          {STUDENT_STEPS.map((step, idx) => {
            const isActive = currentTab === step.id;
            const isDone = checkStepDone(step.id);

            return (
              <button
                key={step.id}
                ref={(el) => { stepRefs.current[idx] = el; }}
                className={`student-step-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onTabChange(step.id);
                  setIsMegaOpen(false);
                }}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className={`step-indicator ${isDone ? 'done' : ''}`}>
                  {isDone ? (
                    <Check size={11} strokeWidth={3} aria-label="Đã hoàn thành" />
                  ) : (
                    <span>{step.stepNum}</span>
                  )}
                </span>
                <span className="step-label">{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Nút Mega-Menu Nghiên cứu & Giảng viên (LucianLabs #354) */}
        <div 
          className="research-mega-container" 
          ref={megaContainerRef}
          onPointerEnter={handleMegaPointerEnter}
          onPointerLeave={handleMegaPointerLeave}
        >
          <button
            ref={megaTriggerBtnRef}
            type="button"
            className={`research-menu-trigger ${isResearchTabActive ? 'active' : ''} ${isMegaOpen ? 'is-open' : ''}`}
            onClick={() => setIsMegaOpen(prev => !prev)}
            aria-expanded={isMegaOpen}
            aria-haspopup="menu"
            aria-label="Menu chức năng nghiên cứu và giảng viên"
          >
            <FlaskConical size={14} />
            <span>Nghiên cứu &amp; Giảng viên</span>
            <ChevronDown 
              size={13} 
              className={`research-chevron-icon ${isMegaOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Morphing Mega Menu Panel #354 với nền đặc var(--ux-surface) */}
          {isMegaOpen && (
            <div 
              className="u354-pn" 
              role="menu"
              aria-label="Danh mục chức năng nghiên cứu và giảng viên"
            >
              {/* Caret 14x14 xoay 45 độ chuẩn LucianLabs #354 */}
              <span className="u354-car" aria-hidden="true" />

              <div className="research-dropdown-header">
                CÔNG CỤ NGHIÊN CỨU &amp; GIẢNG VIÊN
              </div>

              <div className="u354-list">
                {RESEARCH_TABS.map((item, index) => {
                  const IconComponent = item.icon;
                  const isItemActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitem"
                      style={{ '--i': index } as React.CSSProperties}
                      className={`u354-it ${isItemActive ? 'active' : ''}`}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsMegaOpen(false);
                        megaTriggerBtnRef.current?.focus({ preventScroll: true });
                      }}
                    >
                      <span className="u354-it-icon" style={{ background: item.color }}>
                        <IconComponent size={15} color="#FFFFFF" />
                      </span>
                      <div className="u354-it-texts">
                        <b className="u354-it-title">{item.title}</b>
                        <span className="u354-it-desc">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
