'use client'

import { useState } from 'react'

const pillars = {
  'Health & Wellness': [
    'Weigh 185-190 lbs at ≤12% body-fat',
    'Master handstand skills'
  ],
  'Career & Business': [
    'SERVPRO → $2M gross',
    'Side ventures → $160K/yr'
  ],
  'Finance & Assets': [
    'Buy first home',
    'Passive income ≥ $3K/mo'
  ],
  'Lifestyle & Relationships': [
    'Brazil trip September 2025',
    'Comfort-zone challenges'
  ],
  'Personal Growth': [
    '200h AI/automation study',
    'Read 18 books'
  ],
  'Inner Life & Spirituality': [
    'Daily meditation streak 300 days'
  ]
}

export default function GoalMap() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <section id="goals">
      <h2 className="text-3xl font-semibold mb-4">Goal Map</h2>
      {Object.entries(pillars).map(([p, items]) => (
        <div key={p} className="border rounded mb-2">
          <button
            className="w-full text-left px-4 py-2 bg-indigo-200"
            onClick={() => setOpen(open === p ? null : p)}
          >
            {p}
          </button>
          {open === p && (
            <ul className="p-4 list-disc pl-5 space-y-1">
              {items.map(it => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  )
}
