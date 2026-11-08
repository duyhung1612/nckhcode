/* Lucian UX/UI Prompt #037 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#037 */
// ============================================================================
// COMPONENT: PROFILE DROPDOWN (ACCOUNT SWITCHER MENU · LUCIANLABS #037)
// Solid surface, staggered entrance, floating highlight pill & spring caret
// Cải tiến hiển thị: Mỗi mục đúng 2 dòng chuẩn, không ngắt quãng giữa chừng
// ============================================================================
import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile } from '../../models/types';
import { Sparkles } from 'lucide-react';
import './Navbar.css';

interface ProfileDropdownProps {
  currentStudent: StudentProfile;
  students: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
  variant?: 'navbar' | 'inline';
  currentTab?: string;
}

// Map màu gradient và ký tự đại diện cho hồ sơ thực nghiệm NCKH
const STUDENT_AVATAR_CONFIG: Record<string, { initial: string; gradient: string }> = {
  STU_001: { initial: 'A', gradient: 'linear-gradient(140deg, #38BDF8, #0284C7)' },
  STU_002: { initial: 'B', gradient: 'linear-gradient(140deg, #10B981, #059669)' },
  STU_003: { initial: 'C', gradient: 'linear-gradient(140deg, #F59E0B, #D97706)' }
};

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  currentStudent,
  students,
  onSelectStudent,
  variant = 'navbar',
  currentTab
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const triggerAvatarRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Highlight bar position
  const [highlightStyle, setHighlightStyle] = useState<{ y: number; h: number; opacity: number }>({
    y: 0,
    h: 52,
    opacity: 0
  });

  // Tự động đóng khi cuộn trang bất kỳ của window
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Tự động đóng khi currentTab thay đổi từ nơi khác
  useEffect(() => {
    setIsOpen(false);
  }, [currentTab]);

  // Click outside và phím Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerBtnRef.current?.focus({ preventScroll: true });
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Di chuyển highlight bar theo item hover/focus
  const setHighlight = (index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      setHighlightStyle({
        y: el.offsetTop,
        h: el.offsetHeight,
        opacity: 1
      });
    }
  };

  const clearHighlight = () => {
    setHighlightStyle(prev => ({ ...prev, opacity: 0 }));
  };

  // Chọn hồ sơ sinh viên
  const handleSelect = (student: StudentProfile) => {
    onSelectStudent(student);
    setIsOpen(false);
    triggerBtnRef.current?.focus({ preventScroll: true });

    // Hiệu ứng xoay -20deg và scale .6 rồi về lại chuẩn LucianLabs #037
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (triggerAvatarRef.current?.animate && !rm) {
      triggerAvatarRef.current.animate(
        [
          { transform: 'scale(.6) rotate(-20deg)' },
          { transform: 'none' }
        ],
        { duration: 450, easing: 'cubic-bezier(.34, 1.45, .64, 1)' }
      );
    }
  };

  // Lấy avatar config của sinh viên hiện tại
  const currentAvatar = STUDENT_AVATAR_CONFIG[currentStudent?.id] || {
    initial: currentStudent?.name?.charAt(0) || 'S',
    gradient: 'linear-gradient(140deg, #8B5CF6, #6366F1)'
  };

  const currentShortName = currentStudent?.name 
    ? currentStudent.name.split('(')[0].trim() 
    : 'Chọn hồ sơ';

  const currentScore = currentStudent?.preTestReport?.totalScore ?? 0;

  return (
    <div
      ref={containerRef}
      className={`u037-wrapper custom-profile-dropdown ${variant} ${isOpen ? 'is-open' : ''}`}
    >
      {/* Trigger chip theo phong cách LucianLabs #037 (ô vuông bo tròn 32x32) */}
      <button
        ref={triggerBtnRef}
        type="button"
        className="u037-chip"
        onClick={() => setIsOpen(prev => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
            setTimeout(() => {
              itemRefs.current[0]?.focus({ preventScroll: true });
            }, 60);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Hồ sơ sinh viên hiện tại: ${currentStudent?.code} - ${currentShortName}`}
      >
        <span 
          ref={triggerAvatarRef}
          className="u037-ws" 
          style={{ background: currentAvatar.gradient }}
          aria-hidden="true"
        >
          {currentAvatar.initial}
        </span>
        <span className="u037-chip-texts">
          <b>{currentShortName}</b>
          <small>{currentStudent?.code || '---'} · {currentScore}/100đ</small>
        </span>
        {/* Caret xoay 180 độ khi mở */}
        <svg 
          className={`u037-car ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          aria-hidden="true"
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {/* Menu xổ xuống nền đặc theo mẫu LucianLabs #037 */}
      {isOpen && (
        <div 
          className="u037-menu" 
          role="menu"
          aria-label="Danh sách hồ sơ thực nghiệm sinh viên NCKH"
        >
          <div className="u037-sec">
            <Sparkles size={11} className="u037-sec-icon" aria-hidden="true" />
            <span>HỒ SƠ THỰC NGHIỆM ĐỐI CHỨNG</span>
          </div>

          <ul 
            ref={listRef}
            className={`u037-list ${highlightStyle.opacity > 0 ? 'is-hl' : ''}`}
            onPointerLeave={clearHighlight}
          >
            {/* Thanh highlight di chuyển theo item hover/focus */}
            <li 
              className="u037-hl" 
              role="presentation"
              style={{
                transform: `translateY(${highlightStyle.y}px)`,
                height: `${highlightStyle.h}px`,
                opacity: highlightStyle.opacity
              }}
            />

            {(students || []).map((student, index) => {
              const isSelected = student.id === currentStudent?.id;
              const avatar = STUDENT_AVATAR_CONFIG[student.id] || {
                initial: student.name?.charAt(0) || 'S',
                gradient: 'linear-gradient(140deg, #8B5CF6, #6366F1)'
              };
              const score = student.preTestReport?.totalScore ?? 0;
              // Rút gọn tên trước dấu "(" (ví dụ: "Nguyễn Văn A" thay vì "Nguyễn Văn A (Hồ sơ A)")
              const shortName = student.name ? student.name.split('(')[0].trim() : 'Sinh viên';

              return (
                <li key={student.id} role="none">
                  <button
                    ref={(el) => { itemRefs.current[index] = el; }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isSelected}
                    className={`u037-it ${isSelected ? 'selected' : ''}`}
                    style={{ '--i': index } as React.CSSProperties}
                    onPointerEnter={() => setHighlight(index)}
                    onFocus={() => setHighlight(index)}
                    onClick={() => handleSelect(student)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextIdx = (index + 1) % students.length;
                        itemRefs.current[nextIdx]?.focus({ preventScroll: true });
                        setHighlight(nextIdx);
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevIdx = (index - 1 + students.length) % students.length;
                        itemRefs.current[prevIdx]?.focus({ preventScroll: true });
                        setHighlight(prevIdx);
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        setIsOpen(false);
                        triggerBtnRef.current?.focus({ preventScroll: true });
                      } else if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(student);
                      }
                    }}
                  >
                    {/* Ô vuông bo tròn 32x32 theo #037 */}
                    <span 
                      className="u037-ws" 
                      style={{ background: avatar.gradient }}
                      aria-hidden="true"
                    >
                      {avatar.initial}
                    </span>

                    {/* Khối chứa 2 dòng thông tin (min-width: 0 đảm bảo ellipsis hoạt động) */}
                    <span className="u037-it-info">
                      {/* Dòng 1: Mã hồ sơ + Tên (chỉ đúng 1 dòng, không ngắt) */}
                      <span className="u037-it-name">
                        <span className="u037-code-badge">{student.code}</span>
                        <strong className="u037-it-fullname" title={student.name}>
                          {shortName}
                        </strong>
                      </span>

                      {/* Dòng 2: Vai trò + Điểm Pre-test (chỉ đúng 1 dòng, không ngắt) */}
                      <span className="u037-it-sub">
                        <span className="u037-it-role" title={student.targetRole}>
                          {student.targetRole}
                        </span>
                        <span className="u037-it-score">
                          Pre-test: {score}/100
                        </span>
                      </span>
                    </span>

                    {/* Dấu tick SVG với scale .4 -> 1 chuẩn #037 */}
                    <svg className="u037-ck" viewBox="0 0 18 18" aria-hidden="true">
                      <path d="M4 9.5l3.5 3.5L14 6" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
