"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"
import type { ComponentProps, PointerEvent, ReactNode } from "react"

import { EASE } from "@/lib/motion"

/**
 * Fades + lifts its children into view the first time they enter the viewport.
 * Replaces the old `.animate-fade-in-up` CSS keyframe (which fired on page load).
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  amount = 0.3,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: keyof typeof motion
  amount?: number
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Container that staggers the entrance of its `RevealItem` children as the
 * group scrolls into view. Replaces the per-card `animation-delay-*` utilities.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  amount = 0.2,
  ...rest
}: {
  children: ReactNode
  className?: string
  stagger?: number
  amount?: number
} & Omit<ComponentProps<typeof motion.div>, "children">) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  }
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 28,
  ...rest
}: {
  children: ReactNode
  className?: string
  y?: number
} & Omit<ComponentProps<typeof motion.div>, "children">) {
  const reduce = useReducedMotion()
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  }
  return (
    <motion.div className={className} variants={variants} {...rest}>
      {children}
    </motion.div>
  )
}

/**
 * Pointer-reactive 3D tilt. Tracks the cursor over the element and drives
 * rotateX/rotateY through springs for a weighty, premium feel. Falls back to a
 * plain wrapper when the user prefers reduced motion. Replaces nothing CSS could
 * do — this is the "feels alive under the pointer" layer.
 */
export function Tilt({
  children,
  className,
  max = 7,
  scale = 1.02,
}: {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees at the corners. */
  max?: number
  /** Scale applied while hovered. */
  scale?: number
}) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 220, damping: 18, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)

  if (reduce) return <div className={className}>{children}</div>

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={{ scale }}
      transition={{ type: "spring", ...spring }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
    >
      {children}
    </motion.div>
  )
}
