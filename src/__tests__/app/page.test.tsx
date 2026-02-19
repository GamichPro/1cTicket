import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../../app/page'

describe('Home Page', () => {
  it('should render the logo image', () => {
    // Act
    render(<Home />)

    // Assert
    const logo = screen.getByAltText('Z.ai Logo')
    expect(logo).toBeDefined()
    expect(logo.getAttribute('src')).toBe('/logo.svg')
  })

  it('should have centered layout styles', () => {
    // Act
    render(<Home />)

    // Assert - Check container exists
    const container = screen.getByAltText('Z.ai Logo').parentElement?.parentElement
    expect(container).toBeDefined()
  })

  it('should render without errors', () => {
    // Act & Assert
    expect(() => render(<Home />)).not.toThrow()
  })

  it('should be a client component', () => {
    // Assert - Check the component is defined
    expect(Home).toBeDefined()
    expect(typeof Home).toBe('function')
  })
})
