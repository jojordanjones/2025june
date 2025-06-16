export default function Systems() {
  const templates = [
    { title: 'Sunday Planning Ritual', content: 'Weekly review checklist' },
    { title: 'Habit-Builder Matrix', content: 'Design good habits' }
  ]
  return (
    <main className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-4">
      {templates.map(t => (
        <div key={t.title} className="border rounded p-4">
          <h3 className="font-semibold mb-2">{t.title}</h3>
          <pre className="text-sm whitespace-pre-wrap">{t.content}</pre>
        </div>
      ))}
    </main>
  )
}
