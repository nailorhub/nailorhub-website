import { useEffect } from 'react'

/**
 * Radix RemoveScroll injects <style> at runtime with body margin-right and
 * padding-right (!important), which can override our CSS and cause double
 * scrollbar space. This component runs after that injection and forces both
 * to 0 so we keep a single scrollbar and no layout shift.
 */
export default function ScrollLockOverrides() {
  useEffect(() => {
    const body = document.body
    if (!body) return

    const forceZeroGap = () => {
      body.style.setProperty('margin-right', '0', 'important')
      body.style.setProperty('padding-right', '0', 'important')
    }

    const observer = new MutationObserver(() => {
      if (body.hasAttribute('data-scroll-locked')) {
        forceZeroGap()
        // Radix injects <style> in useEffect; run again next tick so we override it
        setTimeout(forceZeroGap, 0)
        setTimeout(forceZeroGap, 50)
      }
    })

    observer.observe(body, { attributes: true, attributeFilter: ['data-scroll-locked'] })

    return () => observer.disconnect()
  }, [])

  return null
}
