import app from '../../server'
import supertest from 'supertest'
import UsersRepository from './users.repository'

const request = supertest(app)

const dummyUser = {
  user_id: '1',
    email: '',
    username: '',
    password: '',
    created_at: new Date(),
    updated_at: new Date(),
    deleted: false,
    is_admin: false
}

jest.spyOn(UsersRepository.prototype, 'getAll').mockResolvedValue([dummyUser])

describe('User Controller', () => {
  test('get all', async () => {
    await request.get('/users')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body.length).toEqual(1)
        expect(res.body[0]).toMatchObject(JSON.parse(JSON.stringify(dummyUser)))
      })
  })
})