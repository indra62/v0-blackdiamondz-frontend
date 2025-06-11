"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * TypingAnimation
 * @param {object} props
 * @param {string} props.children - The text to animate
 * @param {string} [props.className] - Additional classes
 * @param {number} [props.duration=100] - Typing speed in ms per character
 * @param {number} [props.delay=0] - Delay before animation starts (ms)
 * @param {string|React.ElementType} [props.as="div"] - The element type to render
 * @param {boolean} [props.startOnView=false] - Start animation when in view
 * @param {object} [props] - Additional motion props
 */
export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}) {
  // Dynamic motion component
  const MotionComponent = motion(Component);

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        // "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className
      )}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}
