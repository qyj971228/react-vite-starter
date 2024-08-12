import { useCallback, useEffect, useRef } from "react";

interface UseElementSizeResult {
  domRef: React.RefObject<HTMLDivElement>;
}

function useElementSize(callback?: () => void): UseElementSizeResult {
  const domRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    callback && callback();
  }, [callback]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (!domRef.current)
      throw new Error(
        "domRef is null. The DOM element might not be correctly assigned."
      );
    resizeObserver.observe(domRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [handleResize]);

  return {
    domRef,
  };
}

export default useElementSize;
