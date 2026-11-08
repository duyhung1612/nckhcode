import gsap from 'gsap';
import { useEffect, useRef } from 'react';

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Animate container entrance smoothly
 */
export const animatePageEntrance = (el: HTMLElement | null, onComplete?: () => void) => {
  if (!el || prefersReducedMotion()) {
    if (el) el.style.opacity = '1';
    if (onComplete) onComplete();
    return;
  }

  gsap.fromTo(
    el,
    {
      opacity: 0,
      y: 14,
      scale: 0.995,
      filter: 'blur(4px)'
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.45,
      ease: 'power3.out',
      onComplete
    }
  );
};

/**
 * Stagger child elements (e.g. cards, list items)
 */
export const animateStaggerChildren = (
  parent: HTMLElement | null,
  childSelector: string,
  staggerTime = 0.05
) => {
  if (!parent || prefersReducedMotion()) return;

  const children = parent.querySelectorAll(childSelector);
  if (!children.length) return;

  gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 12
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: staggerTime,
      ease: 'power2.out'
    }
  );
};

/**
 * React hook to attach a subtle 3D tilt effect on hover for cards
 */
export function useCard3DTilt<T extends HTMLElement>(maxTilt = 7) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Apply 3D perspective setup
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        scale: 1.012,
        duration: 0.35,
        ease: 'power1.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [maxTilt]);

  return ref;
}

