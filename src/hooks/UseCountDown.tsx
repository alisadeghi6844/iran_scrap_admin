import React from "react";

type CountdownActions = {
  start: (timeToCount?: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const useCountdown = (initialTime: number = 60 * 1000, interval: number = 1000): [string, CountdownActions] => {
  const [timeLeft, setTimeLeft] = React.useState<number>(initialTime);
  const timer = React.useRef<number | null>(null);

  const run = () => {
    setTimeLeft((prevTimeLeft) => {
      if (prevTimeLeft <= 0) {
        clearInterval(timer.current!);
        return 0; // جلوگیری از منفی شدن زمان
      }
      return prevTimeLeft - interval > 0 ? prevTimeLeft - interval : 0; // به 0 محدود کن
    });
  };

  const start = React.useCallback((timeToCount?: number) => {
    clearInterval(timer.current!);
    const newTimeToCount = timeToCount !== undefined ? timeToCount : initialTime;
    setTimeLeft(newTimeToCount);
    timer.current = window.setInterval(run, interval);
  }, [initialTime, interval]);

  const pause = React.useCallback(() => {
    clearInterval(timer.current!);
  }, []);

  const resume = React.useCallback(() => {
    if (timeLeft > 0 && timer.current === null) {
      timer.current = window.setInterval(run, interval);
    }
  }, [timeLeft, interval]);

  const reset = React.useCallback(() => {
    clearInterval(timer.current!);
    setTimeLeft(initialTime);
    timer.current = null;
  }, [initialTime]);

  const actions = React.useMemo<CountdownActions>(() => ({ start, pause, resume, reset }), [start, pause, resume, reset]);

  React.useEffect(() => {
    return () => clearInterval(timer.current!);
  }, []);

  return [formatTime(Math.floor(timeLeft / 1000)), actions];
};

export { useCountdown };
