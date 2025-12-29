import { useLayoutEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  return mounted;
}
