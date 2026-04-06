import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ChecklistItem from '../../components/ChecklistItem'

const baseItem = {
  id: 'aaa',
  fase: 'pre_light',
  etapa: 'Aplicar template Stype',
  ordem: 1,
  acao: 'Fazer download do template',
  observacao: '',
  tutorial: '',
}

describe('ChecklistItem', () => {
  it('renders action text', () => {
    render(<ChecklistItem item={baseItem} status="pending" onMark={vi.fn()} />)
    expect(screen.getByText('Fazer download do template')).toBeInTheDocument()
  })

  it('shows MARCAR COMO FEITO button when status is current', () => {
    render(<ChecklistItem item={baseItem} status="current" onMark={vi.fn()} />)
    expect(screen.getByText(/marcar como feito/i)).toBeInTheDocument()
  })

  it('does NOT show MARCAR button when status is pending', () => {
    render(<ChecklistItem item={baseItem} status="pending" onMark={vi.fn()} />)
    expect(screen.queryByText(/marcar como feito/i)).not.toBeInTheDocument()
  })

  it('calls onMark with item when button is clicked', () => {
    const onMark = vi.fn()
    render(<ChecklistItem item={baseItem} status="current" onMark={onMark} />)
    fireEvent.click(screen.getByText(/marcar como feito/i))
    expect(onMark).toHaveBeenCalledWith(baseItem)
  })

  it('shows done-by info when status is done', () => {
    render(
      <ChecklistItem
        item={baseItem}
        status="done"
        onMark={vi.fn()}
        feitoPor="Alex"
      />
    )
    expect(screen.getByText(/alex/i)).toBeInTheDocument()
  })
})
