import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Login from '../../pages/Login'

// Mock Firebase auth module
vi.mock('../../firebase', () => ({
  auth: {},
}))
vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
}))

describe('Login', () => {
  it('renders the Google sign-in button', () => {
    render(<Login />)
    expect(screen.getByText(/entrar com google/i)).toBeInTheDocument()
  })

  it('renders the app title', () => {
    render(<Login />)
    expect(screen.getByText(/stype checklist/i)).toBeInTheDocument()
  })
})
