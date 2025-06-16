import { render, screen, fireEvent } from '@testing-library/react'
import KnowledgeBase from '../components/KnowledgeBase'
import { AccentProvider } from '../context/AccentContext'

jest.mock('../data/context.json', () => [
  { domain: 'Test', sub: 'Sub', text: 'hello world', type: 'goal' }
])

test('search filters items', () => {
  render(
    <AccentProvider>
      <KnowledgeBase />
    </AccentProvider>
  )
  expect(screen.getByText('hello world')).toBeInTheDocument()
  const input = screen.getByPlaceholderText('Search...')
  fireEvent.change(input, { target: { value: 'unknown' } })
  expect(screen.queryByText('hello world')).toBeNull()
})
