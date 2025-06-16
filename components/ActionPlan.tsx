'use client'
import { useState } from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'

interface Item { id: string; text: string }
const initial = [
  { id: 'w1', text: 'Prep quarterly plan' },
  { id: 'w2', text: 'Write SOP draft' },
  { id: 'w3', text: 'Record AI demo' },
  { id: 'w4', text: 'Review finances' }
]

export default function ActionPlan() {
  const [items, setItems] = useState<Item[]>(initial)
  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <section id="action" className="mt-8">
      <h2 className="text-3xl font-semibold mb-4">Action Plan</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({active,over})=>{
        if (over && active.id !== over.id) {
          const oldIndex = items.findIndex(i => i.id === active.id)
          const newIndex = items.findIndex(i => i.id === over.id)
          setItems(arrayMove(items, oldIndex, newIndex))
        }
      }}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {items.map(item => (
              <SortableItem key={item.id} id={item.id} text={item.text} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  )
}
