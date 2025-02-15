import { useState, useEffect, useMemo } from "react"

const useMediaQury = (query) => {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query])
  const [match, setMatch] = useState(mediaQuery.matches)

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches)
    mediaQuery.addEventListener("change", onChange)
    return () => mediaQuery.removeEventListener("change", onChange)
  }, [mediaQuery])

  return match
}

const useMediaQueries = () => {
  const min_xs = useMediaQury("(min-width: 265px)")
  const max_xs = useMediaQury("(max-width: 567px)")
  const xs = min_xs && max_xs

  const min_sm = useMediaQury("(min-width: 568px)")
  const max_sm = useMediaQury("(max-width: 639px)")
  const sm = min_sm && max_sm

  const min_md = useMediaQury("(min-width: 640px)")
  const max_md = useMediaQury("(max-width: 767px)")
  const md = min_md && max_md

  const min_lg = useMediaQury("(min-width: 768px)")
  const max_lg = useMediaQury("(max-width: 1023px)")
  const lg = min_lg && max_lg

  const min_xl = useMediaQury("(min-width: 1024px)")
  const max_xl = useMediaQury("(max-width: 1279px)")
  const xl = min_xl && max_xl

  const min_xxl = useMediaQury("(min-width: 1280px)")
  const xxl = min_xxl

  return { xs, sm, md, lg, xl, xxl }
}
export { useMediaQury, useMediaQueries }
