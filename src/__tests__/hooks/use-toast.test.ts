import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast, toast, reducer } from '../../hooks/use-toast'
import type { Action, State, ToasterToast } from '../../hooks/use-toast'

// Helper to create a toast
const createToast = (overrides?: Partial<ToasterToast>): ToasterToast => ({
  id: 'test-id',
  title: 'Test Toast',
  description: 'Test Description',
  open: true,
  ...overrides,
})

describe('Toast Hook System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('reducer', () => {
    const initialState: State = { toasts: [] }

    it('should handle ADD_TOAST', () => {
      // Arrange
      const newToast = createToast()
      const action: Action = { type: 'ADD_TOAST', toast: newToast }

      // Act
      const state = reducer(initialState, action)

      // Assert
      expect(state.toasts).toHaveLength(1)
      expect(state.toasts[0]).toEqual(newToast)
    })

    it('should limit toasts to TOAST_LIMIT', () => {
      // Arrange
      const state1 = reducer(initialState, { type: 'ADD_TOAST', toast: createToast({ id: '1' }) })
      const state2 = reducer(state1, { type: 'ADD_TOAST', toast: createToast({ id: '2' }) })

      // Assert
      expect(state2.toasts).toHaveLength(1)
      expect(state2.toasts[0].id).toBe('2')
    })

    it('should handle UPDATE_TOAST', () => {
      // Arrange
      const stateWithToast = reducer(initialState, {
        type: 'ADD_TOAST',
        toast: createToast({ id: '1', title: 'Old Title' }),
      })

      // Act
      const updatedState = reducer(stateWithToast, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'New Title' },
      })

      // Assert
      expect(updatedState.toasts[0].title).toBe('New Title')
    })

    it('should handle DISMISS_TOAST', () => {
      // Arrange
      const stateWithToast = reducer(initialState, {
        type: 'ADD_TOAST',
        toast: createToast({ id: '1', open: true }),
      })

      // Act
      const dismissedState = reducer(stateWithToast, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      })

      // Assert
      expect(dismissedState.toasts[0].open).toBe(false)
    })

    it('should dismiss all toasts when toastId is undefined', () => {
      // Arrange
      let state = reducer(initialState, { type: 'ADD_TOAST', toast: createToast({ id: '1' }) })
      state = reducer(state, { type: 'ADD_TOAST', toast: createToast({ id: '2' }) })

      // Act
      const dismissedState = reducer(state, { type: 'DISMISS_TOAST', toastId: undefined })

      // Assert
      dismissedState.toasts.forEach((t) => {
        expect(t.open).toBe(false)
      })
    })

    it('should handle REMOVE_TOAST', () => {
      // Arrange
      const stateWithToast = reducer(initialState, {
        type: 'ADD_TOAST',
        toast: createToast({ id: '1' }),
      })

      // Act
      const removedState = reducer(stateWithToast, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      })

      // Assert
      expect(removedState.toasts).toHaveLength(0)
    })

    it('should remove all toasts when toastId is undefined', () => {
      // Arrange
      let state = reducer(initialState, { type: 'ADD_TOAST', toast: createToast({ id: '1' }) })

      // Act
      const removedState = reducer(state, { type: 'REMOVE_TOAST', toastId: undefined })

      // Assert
      expect(removedState.toasts).toHaveLength(0)
    })
  })

  describe('useToast hook', () => {
    it('should return initial state', () => {
      // Act
      const { result } = renderHook(() => useToast())

      // Assert
      expect(result.current.toasts).toBeDefined()
      expect(result.current.toast).toBeDefined()
      expect(result.current.dismiss).toBeDefined()
    })

    it('should add toast via toast function', () => {
      // Act
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({ title: 'Test Toast' })
      })

      // Assert
      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].title).toBe('Test Toast')
    })

    it('should dismiss toast', () => {
      // Arrange
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({ title: 'Test Toast' })
      })

      const toastId = result.current.toasts[0].id

      // Act
      act(() => {
        result.current.dismiss(toastId)
      })

      // Assert
      expect(result.current.toasts[0].open).toBe(false)
    })
  })

  describe('toast function', () => {
    it('should return toast id, dismiss, and update functions', () => {
      // Act
      const result = toast({ title: 'Test' })

      // Assert
      expect(result.id).toBeDefined()
      expect(result.dismiss).toBeInstanceOf(Function)
      expect(result.update).toBeInstanceOf(Function)
    })

    it('should generate unique ids', () => {
      // Act
      const toast1 = toast({ title: 'Test 1' })
      const toast2 = toast({ title: 'Test 2' })

      // Assert
      expect(toast1.id).not.toBe(toast2.id)
    })
  })
})
