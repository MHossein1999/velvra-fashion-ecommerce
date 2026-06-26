// Shared easing curve — the cubic-bezier(0.16, 1, 0.3, 1) "expo-out" feel used
// across every Framer Motion entrance/parallax in the site. Single source of
// truth so the hero, brand strip, and motion primitives stay in sync.
export const EASE = [0.16, 1, 0.3, 1] as const;
