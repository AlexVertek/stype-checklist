import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import FilmagemCard from '../../components/FilmagemCard'

const filmagem = {
  id: 'abc123',
  nome_projeto: 'BB_OuroCap',
  cliente: 'Digi&tal',
  fases_completas: { pre_light: false, gravacao: false, pos_producao: false },
}

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('FilmagemCard', () => {
  it('renders the project name', () => {
    renderWithRouter(<FilmagemCard filmagem={filmagem} />)
    expect(screen.getByText('BB_OuroCap')).toBeInTheDocument()
  })

  it('renders the client name', () => {
    renderWithRouter(<FilmagemCard filmagem={filmagem} />)
    expect(screen.getByText('Digi&tal')).toBeInTheDocument()
  })

  it('links to the checklist page', () => {
    renderWithRouter(<FilmagemCard filmagem={filmagem} />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/filmagens/abc123/checklist')
  })
})
