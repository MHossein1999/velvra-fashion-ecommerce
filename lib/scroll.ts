// Smooth-scroll to an in-page section by id (e.g. "#new"), accounting for
// the sticky header height. Respects prefers-reduced-motion by jumping instantly.
export function scrollToSection(target: string) {
  if (typeof document === "undefined") return
  const id = target.startsWith("#") ? target.slice(1) : target
  const el = document.getElementById(id)
  if (!el) return

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const headerOffset = 80 // sticky header (h-20)
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" })
}
