import { Suspense } from 'react'
import { expect, test } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'

import App from '.'

test('renders without crashing', () => {
  render(<Suspense fallback="loading"><App /></Suspense>)
  expect(screen.getByText('flash.comma.ai')).toBeInTheDocument()
})

test('opens the walkthrough video from the landing page', () => {
  render(<Suspense fallback="loading"><App /></Suspense>)

  fireEvent.click(screen.getByRole('button', { name: /watch walkthrough/i }))

  const dialog = screen.getByRole('dialog', { name: /flash\.comma\.ai walkthrough video/i })
  expect(within(dialog).getByTitle('flash.comma.ai walkthrough video')).toBeInTheDocument()
  expect(within(dialog).getByRole('button', { name: /close walkthrough video/i })).toBeInTheDocument()
  expect(within(dialog).getByRole('button', { name: /close walkthrough video/i })).toHaveFocus()
})

test('closes the walkthrough video with the Escape key', () => {
  render(<Suspense fallback="loading"><App /></Suspense>)

  fireEvent.click(screen.getByRole('button', { name: /watch walkthrough/i }))
  expect(screen.getByRole('dialog', { name: /flash\.comma\.ai walkthrough video/i })).toBeInTheDocument()

  fireEvent.keyDown(document, { key: 'Escape' })

  expect(screen.queryByRole('dialog', { name: /flash\.comma\.ai walkthrough video/i })).not.toBeInTheDocument()
})
