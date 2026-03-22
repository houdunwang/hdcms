import Upload from '#core/models/upload'
import { ImageService } from '#core/services/image_service'
import { OssService } from '#core/services/oss_service'
import { UploadService } from '#core/services/upload_service'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

function createMockHttpContext(user: User | null = null) {
  return {
    auth: {
      user,
    },
  } as unknown as import('@adonisjs/core/http').HttpContext
}

function createMockOssService() {
  return {
    upload: async (key: string, _filePath: string) => {
      return { url: `https://oss.example.com/${key}` }
    },
  } as unknown as OssService
}

function createMockImageService() {
  return {
    resize: async () => true,
  } as unknown as ImageService
}

test.group('UploadService - 单元测试', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('验证 Service 可以正常实例化', async ({ assert }) => {
    const ctx = createMockHttpContext()
    const ossService = createMockOssService()
    const imageService = createMockImageService()
    const service = new UploadService(ctx, ossService, imageService)

    assert.instanceOf(service, UploadService)
  })

  test('验证本地文件上传并保存到数据库', async ({ assert }) => {
    const user = await User.create({
      name: 'testuser',
      password: 'password123',
      email: 'test@example.com',
    })

    const testDir = join(tmpdir(), 'upload-test-' + Date.now())
    mkdirSync(testDir, { recursive: true })
    const testFilePath = join(testDir, 'test.txt')
    writeFileSync(testFilePath, 'test content')

    const mockFile = {
      clientName: 'test.txt',
      extname: 'txt',
      size: 12,
      tmpPath: testFilePath,
      meta: {} as Record<string, unknown>,
      moveToDisk: async (path: string) => {
        mockFile.meta.url = `/uploads/${path}`
        mockFile.filePath = path
      },
    } as unknown as import('@adonisjs/core/bodyparser').MultipartFile

    const ctx = createMockHttpContext(user)
    const ossService = createMockOssService()
    const imageService = createMockImageService()
    const service = new UploadService(ctx, ossService, imageService)

    const result = await service['local'](mockFile)

    assert.isTrue(result.$isPersisted)
    assert.equal(result.name, 'test.txt')
    assert.equal(result.extension, 'txt')
    assert.equal(result.size, 12)
    assert.equal(result.userId, user.id)
    assert.equal(result.driver, 'local')

    rmSync(testDir, { recursive: true, force: true })
  })

  test('验证文件名生成格式正确', async ({ assert }) => {
    const user = await User.create({
      name: 'filenameuser',
      password: 'password123',
      email: 'filename@example.com',
    })

    const ctx = createMockHttpContext(user)
    const ossService = createMockOssService()
    const imageService = createMockImageService()
    const service = new UploadService(ctx, ossService, imageService)

    const mockFile = {
      extname: 'png',
    } as import('@adonisjs/core/bodyparser').MultipartFile

    const fileName = service['fileName'](mockFile)

    assert.include(fileName, 'attachments/')
    assert.include(fileName, 'U' + user.id)
    assert.isTrue(fileName.endsWith('.png'))
    const parts = fileName.split('/')
    assert.match(parts[parts.length - 1], /^U\d+\d{6}-[a-f0-9-]+\.png$/)
  })

  test('验证上传记录保存到数据库', async ({ assert }) => {
    const user = await User.create({
      name: 'dbuser',
      password: 'password123',
      email: 'db@example.com',
    })

    const mockFile = {
      clientName: 'document.pdf',
      extname: 'pdf',
      size: 1024,
      meta: { url: 'https://example.com/document.pdf' },
    } as unknown as import('@adonisjs/core/bodyparser').MultipartFile

    const ctx = createMockHttpContext(user)
    const ossService = createMockOssService()
    const imageService = createMockImageService()
    const service = new UploadService(ctx, ossService, imageService)

    const result = await service['saveToDatabase'](mockFile)

    assert.isTrue(result.$isPersisted)
    assert.equal(result.url, 'https://example.com/document.pdf')
    assert.equal(result.name, 'document.pdf')
    assert.equal(result.size, 1024)
    assert.equal(result.extension, 'pdf')

    const dbRecord = await Upload.find(result.id)
    assert.isDefined(dbRecord)
    assert.equal(dbRecord!.name, 'document.pdf')
  })

  test('验证 OSS 上传流程', async ({ assert }) => {
    const user = await User.create({
      name: 'ossuser',
      password: 'password123',
      email: 'oss@example.com',
    })

    const testDir = join(tmpdir(), 'upload-oss-test-' + Date.now())
    mkdirSync(testDir, { recursive: true })
    const testFilePath = join(testDir, 'test.jpg')
    writeFileSync(testFilePath, 'fake image content')

    const mockFile = {
      clientName: 'test.jpg',
      extname: 'jpg',
      size: 18,
      tmpPath: testFilePath,
      meta: {} as Record<string, unknown>,
    } as unknown as import('@adonisjs/core/bodyparser').MultipartFile

    const ctx = createMockHttpContext(user)
    const ossService = createMockOssService()
    const imageService = createMockImageService()
    const service = new UploadService(ctx, ossService, imageService)

    const result = await service['oss'](mockFile)

    assert.isTrue(result.$isPersisted)
    assert.equal(result.name, 'test.jpg')
    assert.equal(result.extension, 'jpg')
    assert.equal(result.userId, user.id)
    assert.include(result.url, 'https://oss.example.com/')

    rmSync(testDir, { recursive: true, force: true })
  })
})
