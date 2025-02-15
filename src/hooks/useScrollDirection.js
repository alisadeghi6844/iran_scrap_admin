import { useEffect, useState } from "react"

export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState(true)

  useEffect(() => {
    let lastScrollTop = 0
    const onScrolling = () => {
      let currentScrollTop =
        window.pageXOffset || document.documentElement.scrollTop
      if (currentScrollTop > lastScrollTop) {
        setScrollDir(false)
      } else {
        setScrollDir(true)
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop
    }
    window.addEventListener("scroll", onScrolling, false)
    return () => window.removeEventListener("scroll", onScrolling)
  }, [])
  return scrollDir
}
