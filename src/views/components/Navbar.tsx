/* Lucian UX/UI Prompts #212, #219, #039, #354, #027 · MIT License (c) 2026 Seokwoooo */
// ============================================================================
// VIEW COMPONENT: NAVBAR (LAYOUT D TỐI ƯU · SEARCH Ở GIỮA)
// - Hàng 1: Brand (Logo FBU tròn 44x44, Tên trường đầy đủ, Tiêu đề)
//           -> ExpandingSearch #027 (ở giữa, flex-grow)
//           -> ThemeToggle #219 (icon xoay, vòng tròn lan)
//           -> ProfileDropdown #037 (ô vuông bo tròn 32x32)
//           -> Nút "Nghiên cứu & Giảng viên" #354 (ô vuông gradient tím 30x30, mega-menu)
// - Hàng 2: Stepper 6 bước sinh viên (Sliding Pill Tabs #039) chiếm 100% chiều ngang & căn giữa.
// - Hide-on-scroll & Compact header #212, Nav row sticky #242, thanh tiến trình 2px accent.
// - 100% Solid Opaque Panels (var(--ux-surface)), auto-close khi cuộn/Esc/đổi tab/bấm ra ngoài.
// ============================================================================
import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { StorageModel } from '../../models/storage';
import { StudentProfile } from '../../models/types';
import { ProfileDropdown } from './ProfileDropdown';
import { ExpandingSearch } from './ExpandingSearch';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';
import { 
  ClipboardCheck, 
  LineChart, 
  Database, 
  Sliders, 
  Users,
  ChevronDown, 
  Sparkles,
  Check
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentStudent: StudentProfile;
  onStudentChange: (student: StudentProfile) => void;
  students: StudentProfile[];
}

// 6 bước hành trình chuẩn của sinh viên (LucianLabs #039)
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
  const [isCompact, setIsCompact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);
  const megaContainerRef = useRef<HTMLDivElement>(null);
  const megaTriggerBtnRef = useRef<HTMLButtonElement>(null);
  const megaCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLElement>(null);

  // Sliding pill position state (LucianLabs #039)
  const [pillStyle, setPillStyle] = useState<{ x: number; w: number; opacity: number }>({
    x: 0,
    w: 0,
    opacity: 0
  });

  // Theme synchronization effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fbu_nckh_theme', theme);
  }, [theme]);

  // Đóng Research Menu khi currentTab thay đổi (từ Stepper, Search, hoặc phím tắt)
  useEffect(() => {
    setIsMegaOpen(false);
  }, [currentTab]);

  // Hide-on-scroll logic theo LucianLabs #212
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const d = y - lastScrollY.current;
      lastScrollY.current = y;

      // 1. Đóng menu ngay khi cuộn trang
      setIsMegaOpen(false);

      // 2. Tính tích lũy chiều cuộn (accumulator)
      if ((d > 0) === (scrollAccumulator.current > 0)) {
        scrollAccumulator.current += d;
      } else {
        scrollAccumulator.current = d;
      }

      // 3. Tính thanh tiến trình cuộn 2px dưới header
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(100, Math.max(0, (y / maxScroll) * 100));
      setScrollProgress(progress);

      // 4. Ở đỉnh trang (y < 60px): luôn hiện dạng đầy đủ 58px
      if (y < 60) {
        setIsCompact(false);
        setIsHeaderHidden(false);
        return;
      } else {
        setIsCompact(true);
      }

      // 5. Nếu ô tìm kiếm đang mở, giữ header hiện để không ngắt người dùng
      if (isSearchOpen) {
        setIsHeaderHidden(false);
        return;
      }

      // 6. Cuộn xuống tích lũy > 8px -> ẩn header
      if (scrollAccumulator.current > 8) {
        setIsHeaderHidden(true);
      } 
      // Cuộn lên tích lũy < -6px -> hiện header ở dạng gọn 46px
      else if (scrollAccumulator.current < -6) {
        setIsHeaderHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearchOpen]);

  // Click outside và Escape listener cho Mega-Menu Nghiên cứu
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

  // Hover leave / enter timer chuẩn LucianLabs #354 (220ms delay)
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

  // Tính vị trí Sliding Pill cho Stepper 6 bước (LucianLabs #039)
  const updatePillPosition = useCallback(() => {
    const activeIdx = STUDENT_STEPS.findIndex(s => s.id === currentTab);
    if (activeIdx !== -1 && stepRefs.current[activeIdx]) {
      const el = stepRefs.current[activeIdx]!;
      setPillStyle({
        x: el.offsetLeft,
        w: el.offsetWidth,
        opacity: 1
      });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [currentTab]);

  useLayoutEffect(() => {
    updatePillPosition();
  }, [updatePillPosition, isCompact]);

  // ResizeObserver + window resize listener để pill luôn chuẩn xác với flex: 1
  useEffect(() => {
    window.addEventListener('resize', updatePillPosition);
    let observer: ResizeObserver | null = null;
    if (tabsContainerRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updatePillPosition();
      });
      observer.observe(tabsContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updatePillPosition);
      observer?.disconnect();
    };
  }, [updatePillPosition]);

  // Điều hướng bằng phím mũi tên trên stepper (LucianLabs #039)
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx = -1;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (index + 1) % STUDENT_STEPS.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIdx = (index - 1 + STUDENT_STEPS.length) % STUDENT_STEPS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = STUDENT_STEPS.length - 1;
    }

    if (nextIdx !== -1) {
      const nextStep = STUDENT_STEPS[nextIdx];
      onTabChange(nextStep.id);
      stepRefs.current[nextIdx]?.focus({ preventScroll: true });
    }
  };

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
      className={`app-header ${isHeaderHidden ? 'header-hidden' : ''} ${isCompact ? 'is-compact' : ''} ${scrollProgress > 1 ? 'has-scrolled' : ''} ${isSearchOpen ? 'is-search-open' : ''}`}
    >
      {/* ===================================================================
          HÀNG 1: BRAND BÊN TRÁI · SEARCH Ở GIỮA · THEME · HỒ SƠ · NGHIÊN CỨU
          Thứ tự: Brand -> Search (flex-grow) -> Theme -> Hồ sơ -> Nghiên cứu
          =================================================================== */}
      <div className="header-top-row">
        {/* 1. Brand Section: Logo FBU 44x44 tròn + Eyebrow đầy đủ + Tiêu đề 1 dòng */}
        <div className="header-brand-section">
          <img 
            src="/fbu-logo.jpg" 
            alt="Logo FBU" 
            className="brand-logo-img"
            width={44}
            height={44}
          />
          <div className="brand-text">
            {/* Dòng eyebrow đầy đủ tên trường, không viết tắt "ĐH", ẩn khi compact/mobile */}
            <div className="university-badge">
              <Sparkles size={11} className="badge-sparkle-icon" />
              <span>TRƯỜNG ĐẠI HỌC TÀI CHÍNH – NGÂN HÀNG HÀ NỘI (FBU)</span>
            </div>
            {/* Tiêu đề đề tài NCKH, vừa 1 dòng trên desktop */}
            <h1 className="project-title">
              Đánh giá Khoảng cách Kỹ năng Frontend
            </h1>
          </div>
        </div>

        {/* 2. Ô Tìm Kiếm Ở Giữa Hàng 1 (LucianLabs #027) */}
        <div className="header-center-search">
          <ExpandingSearch
            onNavigate={(targetTab) => {
              onTabChange(targetTab);
              setIsSearchOpen(false);
            }}
            onOpenChange={setIsSearchOpen}
            isCompact={isCompact}
          />
        </div>

        {/* Cụm nút bên phải: 3. ThemeToggle -> 4. ProfileDropdown -> 5. Nghiên cứu & Giảng viên */}
        <div className="header-right-actions">
          {/* 3. Nút đổi theme Circular-reveal #219 */}
          <ThemeToggle
            theme={theme}
            onToggleTheme={setTheme}
          />

          {/* 4. ProfileDropdown LucianLabs #037 (icon ô vuông bo tròn 32x32) */}
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

          {/* 5. Nút Mega-Menu Nghiên cứu & Giảng viên #354 (đưa lên hàng 1) */}
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
              {/* Ô vuông gradient tím 30x30 theo chuẩn LucianLabs #354 */}
              <span className="u354-trigger-tile" aria-hidden="true" />
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
      </div>

      {/* ===================================================================
          HÀNG 2 (NAV ROW): STEPPER 6 BƯỚC CHIẾM HẾT CHIỀU NGANG VÀ CĂN GIỮA
          6 pill chia đều chiều rộng (flex 1), chữ căn giữa, cuộn ngang ở màn hẹp
          =================================================================== */}
      <div className="navbar-bottom-row">
        <nav 
          ref={tabsContainerRef}
          className="u039-tabs" 
          role="tablist" 
          aria-label="Hành trình đánh giá và học bổ sung của sinh viên"
        >
          {/* Sliding pill indicator chuyển động spring */}
          <span 
            className="u039-pill"
            style={{
              transform: `translateX(${pillStyle.x}px)`,
              width: `${pillStyle.w}px`,
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
                type="button"
                role="tab"
                id={`tab-step-${step.id}`}
                aria-controls={`panel-step-${step.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={`u039-tab ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onTabChange(step.id);
                  setIsMegaOpen(false);
                }}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                <span className={`u039-step-badge ${isDone ? 'is-done' : ''} ${isActive ? 'is-active' : ''}`}>
                  {isDone ? (
                    <Check size={11} strokeWidth={3} aria-label="Đã hoàn thành" />
                  ) : (
                    <span>{step.stepNum}</span>
                  )}
                </span>
                <span className="u039-tab-label">{step.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Thanh tiến trình cuộn mỏng 2px màu accent theo LucianLabs #212 */}
      <span 
        className="u212-pg" 
        style={{ width: `${scrollProgress}%` }} 
        aria-hidden="true" 
      />
    </header>
  );
};
