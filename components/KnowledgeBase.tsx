'use client'
import { useState, useMemo, useEffect } from 'react'
import Fuse from 'fuse.js'
import { useRouter } from 'next/router'
import data from '../data/context.json'

interface Entry {
  domain: string
  sub: string
  text: string
  type: string
}

export default function KnowledgeBase() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  const domains = useMemo(() => Array.from(new Set((data as Entry[]).map(e => e.domain))), [])

  useEffect(() => {
    if (router.query.tag && typeof router.query.tag === 'string') {
      setTag(router.query.tag)
    }
  }, [router.query.tag])

  const fuse = useMemo(() => new Fuse(data as Entry[], { keys: ['text', 'domain', 'sub'] }), [])
  const baseResults = query ? fuse.search(query).map(r => r.item) : (data as Entry[])
  const results = tag ? baseResults.filter(r => r.domain.includes(tag)) : baseResults

  const grouped = results.reduce<Record<string, Entry[]>>((acc, item) => {
    const key = `${item.domain} / ${item.sub}`
    acc[key] = acc[key] || []
    acc[key].push(item)
    return acc
  }, {})

  return (
    <section id="knowledge" className="space-y-4">
      <h2 className="text-3xl font-semibold mb-4">Knowledge Base</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-1 p-2 border rounded"
        />
        <select
          value={tag ?? ''}
          onChange={e => {
            const val = e.target.value || null
            setTag(val)
            router.push({ query: val ? { tag: val } : {} }, undefined, { shallow: true })
          }}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          {domains.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      {Object.entries(grouped).map(([key, items]) => (
        <details key={key} className="border rounded">
          <summary className="cursor-pointer px-4 py-2 bg-accent/20">{key}</summary>
          <ul className="list-disc pl-5 p-2 space-y-1">
            {items.map((it, i) => (
              <li key={i}>{it.text}</li>
            ))}
          </ul>
        </details>
      ))}
    </section>
  )
}
