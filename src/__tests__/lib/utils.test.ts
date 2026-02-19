import { describe, it, expect } from 'vitest'
import { cn } from '../../lib/utils'

describe('Утилиты: функция cn', () => {
  describe('cn (объединение классов)', () => {
    it('должен правильно объединять имена классов', () => {
      // Действие
      const result = cn('foo', 'bar')

      // Проверка
      expect(result).toBe('foo bar')
    })

    it('должен обрабатывать условные классы', () => {
      // Действие
      const result = cn('base', false && 'hidden', true && 'visible')

      // Проверка
      expect(result).toBe('base visible')
    })

    it('должен правильно объединять Tailwind классы', () => {
      // Действие
      const result = cn('px-2 py-1', 'px-4')

      // Проверка - px-4 должен переопределить px-2
      expect(result).toContain('px-4')
      expect(result).toContain('py-1')
      expect(result).not.toContain('px-2')
    })

    it('должен обрабатывать undefined и null значения', () => {
      // Действие
      const result = cn('base', undefined, null, 'end')

      // Проверка
      expect(result).toBe('base end')
    })

    it('должен обрабатывать объектную нотацию', () => {
      // Действие
      const result = cn({
        active: true,
        disabled: false,
        hidden: true,
      })

      // Проверка
      expect(result).toContain('active')
      expect(result).toContain('hidden')
      expect(result).not.toContain('disabled')
    })

    it('должен обрабатывать массив классов', () => {
      // Действие
      const result = cn(['foo', 'bar'], 'baz')

      // Проверка
      expect(result).toBe('foo bar baz')
    })

    it('должен обрабатывать пустой ввод', () => {
      // Действие
      const result = cn()

      // Проверка
      expect(result).toBe('')
    })

    it('должен обрабатывать сложные конфликты Tailwind', () => {
      // Действие
      const result = cn('text-red-500', 'text-blue-500', 'font-bold')

      // Проверка
      expect(result).toContain('text-blue-500')
      expect(result).toContain('font-bold')
      expect(result).not.toContain('text-red-500')
    })
  })
})
