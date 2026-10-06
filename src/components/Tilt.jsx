import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

export default function Tilt({ k = 14, style, children, ...rest }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const spring = { stiffness: 200, damping: 15 }
  const rotateX = useSpring(useTransform(y, [-.5, .5], [k, -k]), spring)
  const rotateY = useSpring(useTransform(x, [-.5, .5], [-k, k]), spring)
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - .5); y.set((e.clientY - r.top) / r.height - .5)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.div {...rest} onPointerMove={move} onPointerLeave={leave}
      style={{ ...style, rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}>
      {children}
    </motion.div>
  )
}
