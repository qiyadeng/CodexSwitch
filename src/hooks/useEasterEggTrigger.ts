import { useCallback, useEffect, useRef, useState } from 'react';

interface UseEasterEggTriggerOptions {
  threshold?: number;
  windowMs?: number;
  onTrigger: () => void;
}

export function useEasterEggTrigger({
  threshold = 20,
  windowMs = 8000,
  onTrigger,
}: UseEasterEggTriggerOptions) {
  const [count, setCount] = useState(0);
  const timestampsRef = useRef<number[]>([]);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearResetTimer();
    timestampsRef.current = [];
    setCount(0);
  }, [clearResetTimer]);

  const registerClick = useCallback(() => {
    const now = Date.now();
    const minTs = now - windowMs;
    const next = timestampsRef.current.filter((ts) => ts >= minTs);
    next.push(now);
    timestampsRef.current = next;
    setCount(next.length);

    clearResetTimer();
    resetTimerRef.current = setTimeout(() => {
      timestampsRef.current = [];
      setCount(0);
    }, windowMs);

    if (next.length >= threshold) {
      onTrigger();
      timestampsRef.current = [];
      setCount(0);
      clearResetTimer();
    }
  }, [clearResetTimer, onTrigger, threshold, windowMs]);

  useEffect(() => {
    return () => {
      clearResetTimer();
    };
  }, [clearResetTimer]);

  return {
    count,
    registerClick,
    reset,
    threshold,
  };
}
