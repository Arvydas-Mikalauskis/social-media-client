import { logout } from '../js/api/auth/logout'

describe('logout function', () => {
  it('clears the token from local storage', () => {
    const mockRemove = jest.fn()
    global.localStorage = {
      removeItem: mockRemove,
    }

    logout()

    expect(mockRemove).toHaveBeenCalledWith('token')
  })

  it('clears the profile from local storage', () => {
    const mockRemove = jest.fn()
    global.localStorage = {
      removeItem: mockRemove,
    }

    logout()

    expect(mockRemove).toHaveBeenCalledWith('profile')
  })
})
