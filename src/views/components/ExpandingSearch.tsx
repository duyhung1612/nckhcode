/* Lucian UX/UI Prompt #027 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#027 */
// ============================================================================
// COMPONENT: EXPANDING TOP-BAR SEARCH (ADAPTED FROM LUCIANLABS #027)
// Center expanding search: semi-expanded by default on desktop, collapses to icon in compact mode,
// live suggestions from 11 tabs, 12 JDs & question topics, full keyboard navigation and ARIA.
// ============================================================================
import React, { useState, useRef, useEffect, useId } from 'react';
import { SEED_JOB_POSTINGS } from '../../models/seedJobPostings';

export interface ExpandingSearchProps {
  onNavigate: (tabId: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
  isCompact?: boolean;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
  targetTab: string;
}

// Dữ liệu thật từ 11 tab hệ thống, 12 JD TopCV và ngân hàng kiến thức
const SEARCH_DATABASE: SearchItem[] = [
  // 11 Tab hệ thống
  { id: 'tab-assess', title: 'Làm bài đánh giá (Pre-test & Post-test)', category: 'Hành trình sinh viên', gradient: 'linear-gradient(140deg,#38BDF8,#0284C7)', targetTab: 'assessment' },
  { id: 'tab-diag', title: 'Báo cáo Chẩn đoán khoảng cách kỹ năng C(s)', category: 'Hành trình sinh viên', gradient: 'linear-gradient(140deg,#0EA5E9,#6366F1)', targetTab: 'diagnostic' },
  { id: 'tab-road', title: 'Lộ trình học tương tác cá nhân hóa DAG', category: 'Hành trình sinh viên', gradient: 'linear-gradient(140deg,#10B981,#059669)', targetTab: 'roadmap' },
  { id: 'tab-pract', title: 'Bài thực hành Mini Product Catalog & Git', category: 'Hành trình sinh viên', gradient: 'linear-gradient(140deg,#F59E0B,#D97706)', targetTab: 'practical' },
  { id: 'tab-job', title: 'Đối sánh 12 JD TopCV theo độ sẵn sàng', category: 'Hành trình sinh viên', gradient: 'linear-gradient(140deg,#EC4899,#BE185D)', targetTab: 'jobMatcher' },
  { id: 'tab-mock', title: 'Luyện phỏng vấn Tech (6 câu hỏi chuẩn)', category: 'Hành trình sinh viên', gradient: 'linear-gradient(140deg,#8B5CF6,#6D28D9)', targetTab: 'mockInterview' },
  { id: 'tab-qb', title: 'Ngân hàng 120 câu hỏi trắc nghiệm ma trận', category: 'Nghiên cứu & Giảng viên', gradient: 'linear-gradient(140deg,#3B82F6,#1D4ED8)', targetTab: 'questionBank' },
  { id: 'tab-blind', title: 'Chấm mù Rubric bài thực hành', category: 'Nghiên cứu & Giảng viên', gradient: 'linear-gradient(140deg,#6366F1,#4338CA)', targetTab: 'blindGrading' },
  { id: 'tab-comp', title: 'Đối chiếu Hồ sơ thực nghiệm A/B', category: 'Nghiên cứu & Giảng viên', gradient: 'linear-gradient(140deg,#14B8A6,#0F766E)', targetTab: 'comparative' },
  { id: 'tab-anal', title: 'Thống kê NCKH & Đo lường tiến bộ', category: 'Nghiên cứu & Giảng viên', gradient: 'linear-gradient(140deg,#F43F5E,#BE123C)', targetTab: 'analytics' },
  { id: 'tab-set', title: 'Cấu hình Độ nhạy & Trọng số kỹ năng', category: 'Nghiên cứu & Giảng viên', gradient: 'linear-gradient(140deg,#64748B,#334155)', targetTab: 'settings' },

  // Nhóm kỹ năng & Chủ đề câu hỏi
  { id: 'skill-g1', title: 'G1 · HTML/CSS & Responsive (Flexbox, Grid)', category: 'Ngân hàng kiến thức', gradient: 'linear-gradient(140deg,#0284C7,#38BDF8)', targetTab: 'questionBank' },
  { id: 'skill-g2', title: 'G2 · JavaScript & DOM (ES6+, Scope, Closure, this)', category: 'Ngân hàng kiến thức', gradient: 'linear-gradient(140deg,#F59E0B,#EAB308)', targetTab: 'questionBank' },
  { id: 'skill-g3', title: 'G3 · React cơ bản (Props, State, Hooks, VDOM)', category: 'Ngân hàng kiến thức', gradient: 'linear-gradient(140deg,#06B6D4,#0284C7)', targetTab: 'questionBank' },
  { id: 'skill-g4', title: 'G4 · Kết nối API & Bất đồng bộ (Async/Await, Fetch)', category: 'Ngân hàng kiến thức', gradient: 'linear-gradient(140deg,#8B5CF6,#6366F1)', targetTab: 'questionBank' },
  { id: 'skill-g5', title: 'G5 · Git/GitHub & DevTools (Branch, PR, Commits)', category: 'Ngân hàng kiến thức', gradient: 'linear-gradient(140deg,#F97316,#EA580C)', targetTab: 'questionBank' },
  { id: 'skill-g6', title: 'G6 · Debug & Kiểm thử Frontend (Memory Leak, Stack)', category: 'Ngân hàng kiến thức', gradient: 'linear-gradient(140deg,#EF4444,#DC2626)', targetTab: 'questionBank' },

  // 12 Tin tuyển dụng TopCV
  ...SEED_JOB_POSTINGS.map(job => ({
    id: `job-${job.id}`,
    title: `${job.company} · ${job.title}`,
    category: `Tin tuyển dụng ${job.jobType}`,
    gradient: 'linear-gradient(140deg,#10B981,#06B6D4)',
    targetTab: 'jobMatcher'
  }))
];

const RECENT_QUICK_SEARCHES = [
  'Báo cáo Chẩn đoán',
  'JavaScript & DOM',
  'TopCV Fresher',
  'Ngân hàng 120 câu'
];

export const ExpandingSearch: React.FC<ExpandingSearchProps> = ({
  onNavigate,
  onOpenChange,
  isCompact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  // Báo trạng thái mở/đóng ra ngoài cho header
  const handleOpen = () => {
    setIsOpen(true);
    onOpenChange?.(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 80);
  };

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
    setQuery('');
    setActiveIndex(-1);
    triggerBtnRef.current?.focus();
  };

  // Tự động đóng popover nếu header chuyển sang dạng compact
  useEffect(() => {
    if (isCompact && isOpen) {
      handleClose();
    }
  }, [isCompact]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) {
          handleClose();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Lọc tối đa 3 kết quả phù hợp nhất
  const filteredResults: SearchItem[] = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return SEARCH_DATABASE.slice(0, 3);
    }
    return SEARCH_DATABASE.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 3);
  }, [query]);

  // Điều chỉnh activeIndex khi danh sách thay đổi
  useEffect(() => {
    if (filteredResults.length > 0) {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }
  }, [filteredResults]);

  // Xử lý chọn item
  const handleSelectItem = (item: SearchItem) => {
    onNavigate(item.targetTab);
    handleClose();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
      return;
    }

    if (e.key === 'ArrowDown' && filteredResults.length > 0) {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filteredResults.length);
      return;
    }

    if (e.key === 'ArrowUp' && filteredResults.length > 0) {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredResults.length) {
        handleSelectItem(filteredResults[activeIndex]);
      }
    }
  };

  // Highlight từ khóa khớp
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="u027-mark">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div 
      className={`u027 ${isOpen ? 'is-open' : ''} ${isCompact ? 'is-compact' : 'is-default-expanded'}`} 
      ref={containerRef}
    >
      <div 
        className="u027-field"
        onClick={() => {
          if (!isOpen && !isCompact) {
            handleOpen();
          }
        }}
      >
        {/* Nút kính lúp mở tìm kiếm */}
        <button
          className="u027-go"
          type="button"
          ref={triggerBtnRef}
          aria-label={isOpen ? "Nhập từ khóa tìm kiếm" : "Mở ô tìm kiếm"}
          aria-expanded={isOpen}
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) {
              inputRef.current?.focus();
            } else {
              handleOpen();
            }
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.2 4.2" />
          </svg>
        </button>

        {/* Input tìm kiếm */}
        <input
          ref={inputRef}
          className="u027-in"
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
          placeholder="Tìm tab, JD TopCV, câu hỏi..."
          tabIndex={isCompact && !isOpen ? -1 : 0}
          autoComplete="off"
          value={query}
          onFocus={() => {
            if (!isOpen) {
              handleOpen();
            }
          }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Nút đóng X (hiện khi mở hoặc có query) */}
        {(isOpen || query) && (
          <button
            className="u027-x"
            type="button"
            aria-label="Đóng tìm kiếm"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 7l10 10M17 7L7 17" />
            </svg>
          </button>
        )}
      </div>

      {/* Popover danh sách gợi ý & kết quả (LucianLabs #027) */}
      {isOpen && (
        <div 
          className="u027-pop" 
          role="region" 
          aria-label="Kết quả tìm kiếm và gợi ý"
        >
          <p className="u027-sec">Gần đây</p>
          <div className="u027-recent">
            {RECENT_QUICK_SEARCHES.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  inputRef.current?.focus();
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          <p className="u027-sec">
            {query.trim() ? 'Kết quả tìm kiếm' : 'Đề xuất'}
          </p>
          <ul
            id={listId}
            className="u027-list"
            role="listbox"
            aria-label="Danh sách gợi ý tìm kiếm"
          >
            {filteredResults.length === 0 ? (
              <li className="u027-empty">Không tìm thấy kết quả cho &ldquo;{query}&rdquo;</li>
            ) : (
              filteredResults.map((item, index) => {
                const isSelected = index === activeIndex;
                return (
                  <li
                    key={item.id}
                    id={`${listId}-opt-${index}`}
                    className={`u027-opt ${isSelected ? 'active' : ''}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <i 
                      style={{ background: item.gradient }} 
                      aria-hidden="true" 
                    />
                    <span>
                      <b>{renderHighlightedText(item.title, query)}</b>
                      <small>{item.category}</small>
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
