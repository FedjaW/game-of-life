import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Game of Life/i)
  expect(linkElement).toBeInTheDocument()
})

test.todo(
  'Any live cell with fewer than two live neighbours dies, as if by underpopulation.'
)

test.todo(
  'Any live cell with two or three live neighbours lives on to the next generation.'
)

test.todo(
  'Any live cell with more than three live neighbours dies, as if by overpopulation.'
)

test.todo(
  'Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.'
)
