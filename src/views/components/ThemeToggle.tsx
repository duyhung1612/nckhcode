/* Lucian UX/UI Prompt #219 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#219 */
// ============================================================================
// COMPONENT: THEME TOGGLE (CIRCULAR-REVEAL DARK MODE · LUCIANLABS #219)
// Circular clip-path transition from button center, spinning sun/moon morph,
// full View Transitions API support with temporary overlay fallback.
// ============================================================================
import React, { useRef } from 'react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggleTheme: (newTheme: 'dark' | 'light') => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggleTheme
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark';
    const button = buttonRef.current || e.currentTarget;
    const rect = button.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hàm áp dụng theme cho React state, DOM attribute và localStorage
    const applyTheme = () => {
      onToggleTheme(nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('fbu_nckh_theme', nextTheme);
    };

    // Khi người dùng bật prefers-reduced-motion: đổi ngay lập tức không chạy animation
    if (isReducedMotion) {
      applyTheme();
      return;
    }

    // 1. Thử dùng View Transitions API chuẩn nếu trình duyệt hỗ trợ
    if ('startViewTransition' in document) {
      try {
        const transition = (document as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } })
          .startViewTransition(() => {
            applyTheme();
          });

        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${cx}px ${cy}px)`,
                `circle(${maxRadius}px at ${cx}px ${cy}px)`
              ]
            },
            {
              duration: 700,
              easing: 'cubic-bezier(.65, 0, .35, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          );
        }).catch(() => {
          applyTheme();
        });
        return;
      } catch {
        // Fallback sang phương án overlay bên dưới
      }
    }

    // 2. Phương án fallback bằng lớp overlay tạm với clip-path circle lan ra từ tâm nút
    const overlay = document.createElement('div');
    overlay.className = 'u219-reveal-overlay';
    overlay.style.setProperty('--cx', `${cx}px`);
    overlay.style.setProperty('--cy', `${cy}px`);
    overlay.style.setProperty('--r', `${maxRadius}px`);
    overlay.style.background = nextTheme === 'dark' ? '#111827' : '#FFFFFF';
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add('is-active');
    });

    setTimeout(() => {
      applyTheme();
      setTimeout(() => {
        overlay.remove();
      }, 100);
    }, 700);
  };

  const isDark = theme === 'dark';
  const ariaLabel = isDark ? "Switch to light mode" : "Switch to dark mode";
  const titleText = isDark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối";

  return (
    <button
      ref={buttonRef}
      type="button"
      className="u219-tg"
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={isDark}
      title={titleText}
    >
      <span className={`u219-icon-wrap ${isDark ? 'is-dark' : 'is-light'}`}>
        {isDark ? (
          // LucianLabs #219 Moon SVG
          <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" fill="currentColor">
            <path d="M13.5 9.8A5.6 5.6 0 0 1 6.2 2.5a5.6 5.6 0 1 0 7.3 7.3z" />
          </svg>
        ) : (
          // LucianLabs #219 Sun SVG
          <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
            <circle cx="8" cy="8" r="3" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M8 1.5v1.4M8 13.1v1.4M1.5 8h1.4M13.1 8h1.4M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
            </g>
          </svg>
        )}
      </span>
    </button>
  );
};
