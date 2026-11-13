"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (val: number) => string;
}

export function AnimatedNumber({
  value,
  durationMs = 900,
  prefix = "",
  suffix = "",
  formatter,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const startValue = 0;
    const targetValue = value;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (targetValue - startValue) * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, durationMs]);

  const formatted = formatter ? formatter(displayValue) : displayValue.toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
