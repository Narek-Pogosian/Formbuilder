import { useEffect, useRef } from "react";

export function useInputFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 110);

    return () => clearTimeout(timer);
  }, []);

  return inputRef;
}
