/**
 * Тесты API маршрута: GET /api
 * @vitest-environment node
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { GET } from '../../app/api/route'

describe('API Маршрут: GET /api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('GET', () => {
    it('должен возвращать JSON-ответ с сообщением', async () => {
      // Действие
      const response = await GET()
      const data = await response.json()

      // Проверка
      expect(response).toBeDefined()
      expect(response.status).toBe(200)
      expect(data).toEqual({ message: 'Hello, world!' })
    })

    it('должен возвращать статус 200', async () => {
      // Действие
      const response = await GET()

      // Проверка
      expect(response.status).toBe(200)
    })

    it('должен возвращать Content-Type application/json', async () => {
      // Действие
      const response = await GET()

      // Проверка
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('должен быть асинхронной функцией', () => {
      // Проверка
      expect(GET.constructor.name).toBe('AsyncFunction')
    })
  })
})
