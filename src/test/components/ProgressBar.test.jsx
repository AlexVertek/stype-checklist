import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProgressBar from '../../components/ProgressBar'

describe('ProgressBar', () => {
  it('shows done and total counts', () => {
    render(<ProgressBar done={5} total={20} />)
    expect(screen.getByText('5 de 20 concluídos')).toBeInTheDocument()
  })

  it('renders at 0% when no items done', () => {
    const { container } = render(<ProgressBar done={0} total={10} />)
    const bar = container.querySelector('[data-testid="progress-fill"]')
    expect(bar).toHaveStyle({ width: '0%' })
  })

  it('renders at 100% when all done', () => {
    const { container } = render(<ProgressBar done={10} total={10} />)
    const bar = container.querySelector('[data-testid="progress-fill"]')
    expect(bar).toHaveStyle({ width: '100%' })
  })

  it('renders 0% safely when total is 0', () => {
    const { container } = render(<ProgressBar done={0} total={0} />)
    const bar = container.querySelector('[data-testid="progress-fill"]')
    expect(bar).toHaveStyle({ width: '0%' })
  })
})
