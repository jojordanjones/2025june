import { render, screen, fireEvent } from '@testing-library/react'
import CommandPalette from '../components/CommandPalette'
import { AccentProvider } from '../context/AccentContext'

jest.mock('../data/context.json', () => [])

test('opens and closes palette', () => {
  render(
    <AccentProvider>
      <CommandPalette />
    </AccentProvider>
  )
  fireEvent.click(screen.getByText('⌘K'))
  expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument()
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(screen.queryByPlaceholderText('Type to search...')).toBeInTheDocument()
})
