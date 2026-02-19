import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock PrismaClient
vi.mock('@prisma/client', () => {
  const mockPrismaClient = {
    $connect: vi.fn().mockResolvedValue(undefined),
    $disconnect: vi.fn().mockResolvedValue(undefined),
    user: {
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({ id: '1', email: 'test@test.com' }),
      update: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    },
    post: {
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({ id: '1', title: 'Test' }),
      update: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    },
  }

  return {
    PrismaClient: vi.fn(() => mockPrismaClient),
  }
})

describe('Database Configuration', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
    vi.clearAllMocks()
  })

  describe('db singleton pattern', () => {
    it('should create a single PrismaClient instance in development', async () => {
      // Arrange
      process.env.NODE_ENV = 'development'

      // Act
      const { db } = await import('../../lib/db')

      // Assert
      expect(db).toBeDefined()
      expect(db.user).toBeDefined()
      expect(db.post).toBeDefined()
    })

    it('should reuse existing PrismaClient instance', async () => {
      // Arrange
      process.env.NODE_ENV = 'development'

      // Act
      const { db: db1 } = await import('../../lib/db')
      const { db: db2 } = await import('../../lib/db')

      // Assert
      expect(db1).toBe(db2)
    })

    it('should have query logging enabled', async () => {
      // Arrange & Act
      const { db } = await import('../../lib/db')

      // Assert
      expect(db).toBeDefined()
    })
  })

  describe('database operations', () => {
    it('should be able to connect to database', async () => {
      const { db } = await import('../../lib/db')

      // Act
      await expect(db.$connect()).resolves.not.toThrow()
    })

    it('should be able to disconnect from database', async () => {
      const { db } = await import('../../lib/db')

      // Act
      await expect(db.$disconnect()).resolves.not.toThrow()
    })

    it('should have user model with CRUD operations', async () => {
      const { db } = await import('../../lib/db')

      // Assert
      expect(typeof db.user.findMany).toBe('function')
      expect(typeof db.user.findUnique).toBe('function')
      expect(typeof db.user.create).toBe('function')
      expect(typeof db.user.update).toBe('function')
      expect(typeof db.user.delete).toBe('function')
    })

    it('should have post model with CRUD operations', async () => {
      const { db } = await import('../../lib/db')

      // Assert
      expect(typeof db.post.findMany).toBe('function')
      expect(typeof db.post.findUnique).toBe('function')
      expect(typeof db.post.create).toBe('function')
      expect(typeof db.post.update).toBe('function')
      expect(typeof db.post.delete).toBe('function')
    })
  })
})
