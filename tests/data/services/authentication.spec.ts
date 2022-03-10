import { LoadAdmAccountRepository } from '@/data/contracts/repos'
import { AuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'
describe('AuthenticationService', () => {
  it('testando a autenticação do ADM via user e password', async () => {
    const loadAuthenticationAdmApi = mock < LoadAdmAccountRepository>()
    const sut = new AuthenticationService(loadAuthenticationAdmApi)

    await sut.perform({ user: 'any_user', password: 'any_password' })

    expect(loadAuthenticationAdmApi.loadAdm).toHaveBeenCalledWith({ user: 'any_user', password: 'any_password' })
  })

  it('testando erro na autenticação', async () => {
    const loadAuthenticationAdmApi = mock<LoadAdmAccountRepository>()
    loadAuthenticationAdmApi.loadAdm.mockResolvedValueOnce(undefined)
    const sut = new AuthenticationService(loadAuthenticationAdmApi)

    const sutResult = await sut.perform({ user: 'any_user', password: 'any_password' })

    expect(sutResult).toEqual(new AuthenticationError())
  })
})
