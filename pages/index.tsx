import Head from 'next/head'
import Header from '../components/Header'
import KnowledgeBase from '../components/KnowledgeBase'
import Sidebar from '../components/Sidebar'
import ActionPlan from '../components/ActionPlan'
import Dashboards from '../components/Dashboards'
import CommandPalette from '../components/CommandPalette'
import Hero from '../components/Hero'
import GoalMap from '../components/GoalMap'

export default function Home() {
  const tags = ['Vision', 'System', 'Action', 'Dashboards', 'Manifesto', 'Goals']
  return (
    <>
      <Head>
        <title>Life Operating System 2025</title>
      </Head>
      <Header />
      <Sidebar tags={tags} />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <Hero />
        <section id="vision">
          <h2 className="text-3xl font-semibold mb-4">Vision</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold">Identity</h3>
              <p>A confident, self-aware, emotionally intelligent man who leads with purpose.</p>
            </div>
            <div>
              <h3 className="font-semibold">Values</h3>
              <ul className="list-disc pl-5">
                <li>Integrity</li>
                <li>Honesty</li>
                <li>Growth mindset</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Purpose</h3>
              <p>Solve complex problems &amp; empower people through technology and compassion.</p>
            </div>
          </div>
        </section>
        <section id="system">
          <h2 className="text-3xl font-semibold mb-4">System</h2>
          <ul className="border-l pl-4 space-y-2">
            <li>Daily: Word-of-Day, 3-breath reset, top-3 intentions</li>
            <li>Weekly: Sunday Planning review metrics</li>
            <li>Monthly: Time audit, net-worth update</li>
          </ul>
        </section>
        <ActionPlan />
        <Dashboards />
        <section id="manifesto">
          <h2 className="text-3xl font-semibold mb-4">Manifesto</h2>
        </section>
        <GoalMap />
        <KnowledgeBase />
      </main>
      <CommandPalette />
    </>
  )
}
