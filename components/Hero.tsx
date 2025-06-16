'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur bg-white/60 rounded-lg p-6 my-8 shadow"
    >
      <h2 className="text-3xl font-semibold mb-2">A confident, self-aware leader</h2>
      <p className="italic">“You become what you consistently practice.”</p>
    </motion.section>
  )
}
