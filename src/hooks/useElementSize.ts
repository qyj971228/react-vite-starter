import { useCallback, useEffect, useRef, useState } from 'react'

interface UseElementSizeResult {
  domRef: React.RefObject<HTMLDivElement>
  width: number | undefined // 修复拼写
  height: number | undefined
}

function useElementSize(callback?: () => void): UseElementSizeResult {
  const domRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>()
  const [height, setHeight] = useState<number>()

  const handleResize = useCallback(
    (e: ResizeObserverEntry) => {
      const width = e.contentRect.width
      setWidth(width)
      const height = e.contentRect.height
      setHeight(height)
      callback && callback()
    },
    [callback]
  )

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(handleResize)
    })
    if (!domRef.current)
      throw new Error('domRef is null. The DOM element might not be correctly assigned.')
    resizeObserver.observe(domRef.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [handleResize])

  return {
    domRef,
    width,
    height,
  }
}

export default useElementSize
