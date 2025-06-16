'use client'
import { useState } from 'react'
import Fuse from 'fuse.js'
import data from '../data/context.json'

interface Entry {
  domain: string
  sub: string
  text: string
  type: string
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const fuse = new Fuse(data as Entry[], { keys: ['text', 'domain', 'sub'] })
  const results = query ? fuse.search(query).map(r => r.item) : []

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-2 top-2 px-2 py-1 bg-accent/20 rounded"
      >
        ⌘K
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-start justify-center pt-20">
          <div className="bg-white rounded w-96 p-4">
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full p-2 border rounded mb-2"
            />
            <ul className="max-h-60 overflow-y-auto">
              {results.map((it, i) => (
                <li key={i} className="py-1 px-2 hover:bg-accent/10 cursor-pointer" onClick={() => setOpen(false)}>
                  {it.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
