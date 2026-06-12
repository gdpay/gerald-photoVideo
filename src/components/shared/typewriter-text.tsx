'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterTextProps {
  words: string[];
  delay?: number;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypewriterText({
  words,
  delay = 1500,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2500,
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentWord = words[currentWordIndex] || '';

  const tick = useCallback(() => {
    if (isWaiting) return;

    if (!isDeleting) {
      // Typing
      if (displayedText.length < currentWord.length) {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        timeoutRef.current = setTimeout(tick, typingSpeed);
      } else {
        // Done typing — pause then start deleting
        setIsWaiting(true);
        timeoutRef.current = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
          timeoutRef.current = setTimeout(tick, deletingSpeed);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      } else {
        // Done deleting — move to next word
        setIsDeleting(false);
        setIsWaiting(true);
        setCurrentWordIndex((c) => (c + 1) % words.length);
        timeoutRef.current = setTimeout(() => {
          setIsWaiting(false);
        }, 300);
      }
    }
  }, [displayedText, currentWord, isDeleting, isWaiting, typingSpeed, deletingSpeed, pauseDuration, words.length, currentWordIndex]);

  // Initial delay then start
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsWaiting(false);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  // Main tick loop
  useEffect(() => {
    if (!isWaiting) {
      timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick, isWaiting, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className="inline-block">
      <span>{displayedText}</span>
      <span
        className="inline-block w-[3px] h-[0.85em] bg-gold ml-1 align-middle"
        style={{
          animation: 'typewriterBlink 0.8s step-end infinite',
        }}
      />
    </span>
  );
}
