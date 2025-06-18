'use client'
import Link from 'next/link'
import { useAccent } from '../context/AccentContext'

export default function Header() {
  const { hue, setHue } = useAccent()
  return (
    <header className="backdrop-blur bg-white/60 sticky top-0 z-10 flex items-center justify-between px-4 py-2">
      <h1 className="text-2xl font-semibold accent">Life OS 2025</h1>
      <nav className="space-x-4 hidden md:flex">
        <Link href="#vision" className="hover:underline">Vision</Link>
        <Link href="#system" className="hover:underline">System</Link>
        <Link href="#action" className="hover:underline">Action Plan</Link>
        <Link href="#dashboards" className="hover:underline">Dashboards</Link>
        <Link href="#manifesto" className="hover:underline">Manifesto</Link>
        <Link href="#goals" className="hover:underline">Goal Map</Link>
        <Link href="#knowledge" className="hover:underline">Knowledge Base</Link>
        <Link href="/regimen" className="hover:underline">Regimen</Link>
      </nav>
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={e => setHue(parseInt(e.target.value))}
        className="ml-4"
        aria-label="Accent Hue"
      />
    </header>
  )
}
