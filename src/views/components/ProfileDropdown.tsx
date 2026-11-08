// ============================================================================
// COMPONENT: PROFILE DROPDOWN (CHỌN HỒ SƠ SINH VIÊN MẪU NCKH)
// Custom Dropdown Button + Div List chuẩn Dark Glassmorphism, thay thế <select> native
// ============================================================================
import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile } from '../../models/types';
import { UserCheck, ChevronDown, Check, Sparkles } from 'lucide-react';

interface ProfileDropdownProps {
  currentStudent: StudentProfile;
  students: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
  variant?: 'navbar' | 'inline';
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  currentStudent,
  students,
  onSelectStudent,
  variant = 'navbar'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi nhấp chuột ra ngoài hoặc nhấn phím Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
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

  const handleSelect = (student: StudentProfile) => {
    onSelectStudent(student);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`custom-profile-dropdown ${variant} ${isOpen ? 'is-open' : ''}`}
    >
      {/* Trigger Button thay thế cho native select */}
      <button
        type="button"
        className="profile-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Chọn hồ sơ thực nghiệm sinh viên"
      >
        <div className="trigger-left-content">
          <UserCheck size={15} className="trigger-user-icon" />
          <span className="trigger-label">Hồ sơ:</span>
          <span className="trigger-student-code">{currentStudent?.code || '---'}</span>
          <span className="trigger-student-name">
            - {currentStudent?.name ? currentStudent.name.split('(')[0].trim() : 'Chọn hồ sơ'}
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`trigger-chevron ${isOpen ? 'rotated' : ''}`}
        />
      </button>

      {/* Danh sách Dropdown Popover chuẩn Glassmorphism */}
      {isOpen && (
        <div className="profile-dropdown-menu" role="listbox">
          <div className="dropdown-menu-header">
            <Sparkles size={12} color="var(--accent)" />
            <span>HỒ SƠ THỰC NGHIỆM ĐỐI CHỨNG NCKH</span>
          </div>

          <div className="dropdown-items-list">
            {(students || []).map((student) => {
              const isSelected = student.id === currentStudent?.id;
              const score = student.preTestReport?.totalScore ?? 0;

              return (
                <div
                  key={student.id}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  className={`profile-dropdown-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(student)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(student);
                    }
                  }}
                >
                  <div className="item-meta">
                    <div className="item-title-row">
                      <span className={`item-code-badge ${isSelected ? 'badge-blue' : ''}`}>
                        {student.code}
                      </span>
                      <strong className="item-name">{student.name}</strong>
                    </div>

                    <div className="item-sub-row">
                      <span className="item-role">{student.targetRole}</span>
                      <span className="item-score-pill">
                        Điểm Pre-test: <strong>{score}/100</strong>
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="selected-check-icon">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

