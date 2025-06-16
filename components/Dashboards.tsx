'use client'
import dynamic from 'next/dynamic'

const LineChart = dynamic(() => import('recharts').then(m => m.LineChart), { ssr: false })
const Line = dynamic(() => import('recharts').then(m => m.Line), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false })

const data = [
  { name: 'Jan', weight: 200 },
  { name: 'Feb', weight: 198 },
  { name: 'Mar', weight: 196 },
  { name: 'Apr', weight: 195 }
]

export default function Dashboards() {
  return (
    <section id="dashboards" className="mt-8">
      <h2 className="text-3xl font-semibold mb-4">Dashboards</h2>
      <div className="h-64 bg-white rounded shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="hsl(var(--tw-accent))" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
