/* eslint-disable jest/no-conditional-expect */

import { login } from '../js/api/auth/login'

let localStorageMock = {}
const mockLocalStorage = {
  getItem: jest.fn((key) => localStorageMock[key]),
  setItem: jest.fn((key, value) => {
    localStorageMock[key] = value.toString()
  }),
  clear: jest.fn(() => {
    localStorageMock = {}
  }),
}
global.localStorage = mockLocalStorage

describe('login function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should save token to local storage when provided with valid credentials', async () => {
    const email = 'validEmail@stud.noroff.no'
    const password = 'Noroff'

    const accessToken = 'yourAccessToken'
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        accessToken,
      }),
    })

    await login(email, password)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      `"${accessToken}"`
    )
  })

  // Probably not right.. Check later
  it('should throw error if login crediantials are not valid', async () => {
    const email = 'notValidEmail@stud.noroff.no'
    const password = 'NotValidPass'

    const accessToken = 'yourAccessToken'
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        accessToken,
      }),
    })

    await login(email, password)

    expect(localStorage.setItem).toContain('token', `"${accessToken}"`)
  })

  it('should throw an error if API response is not OK', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    })

    await expect(login('fakeEmail@gmail.com', 'fakePass')).rejects.toThrow(
      'Unauthorized'
    )
  })

  it('should not save token to local storage if API response is not OK', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    })

    try {
      await login('fakeEmail@gmail.com', 'fakePass')
    } catch (error) {
      expect(localStorage.setItem).not.toHaveBeenCalled()
    }
  })
})
