import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'

describe('HomePage', () => {
  it('renders welcome page content', () => {
    render(<HomePage />)
    
    expect(screen.getByText('AI Sentence Learning App')).toBeInTheDocument()
    expect(screen.getByText(/Master English through intelligent sentence analysis/)).toBeInTheDocument()
    expect(screen.getByText('Get started')).toBeInTheDocument()
    expect(screen.getByText('Learn more')).toBeInTheDocument()
  })

  it('renders feature sections', () => {
    render(<HomePage />)
    
    expect(screen.getByText('AI-Powered Analysis')).toBeInTheDocument()
    expect(screen.getByText('Adaptive Learning')).toBeInTheDocument()
    expect(screen.getByText('Real-time Feedback')).toBeInTheDocument()
  })
})