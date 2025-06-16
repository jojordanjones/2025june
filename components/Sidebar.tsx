'use client'
import { useState } from 'react'

export default function Sidebar({ tags }: { tags: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-2 top-2 z-20 px-2 py-1 bg-accent/20 rounded"
      >
        Tags
      </button>
      {open && (
        <aside className="fixed z-10 inset-y-0 left-0 w-64 backdrop-blur bg-white/70 p-4 overflow-y-auto">
          <h2 className="font-semibold mb-2">Tags</h2>
          <ul className="space-y-1">
            {tags.map(t => (
              <li key={t}>
                <a href={`#${t.toLowerCase().replace(/\s+/g, '-')}`}>{t}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  )
}
