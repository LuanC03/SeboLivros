import { LoadAdmAccountRepository, CreateAdmAccountRepository } from '@/data/contracts/repos'
import { AuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: AuthenticationService
  loadAuthenticationAdmApi: MockProxy<LoadAdmAccountRepository>
}

const makeSut = (): SutTypes => {
  const loadAuthenticationAdmApi = mock<LoadAdmAccountRepository>()
  const createAdmApi = mock<CreateAdmAccountRepository>()
  const sut = new AuthenticationService(loadAuthenticationAdmApi, createAdmApi)
  loadAuthenticationAdmApi.loadAdm.mockResolvedValue({
    name: 'any_name',
    email: 'any_email',
    user: 'any_user',
    id: 123
  })
  return { sut, loadAuthenticationAdmApi }
}
describe('AuthenticationService', () => {
  it('testando a autenticação do ADM via user e password', async () => {
    const { sut, loadAuthenticationAdmApi } = makeSut()
    await sut.perform({ user: 'any_user', password: 'any_password' })
    expect(loadAuthenticationAdmApi.loadAdm).toHaveBeenCalledWith({ user: 'any_user', password: 'any_password' })
  })

  it('testando erro na autenticação', async () => {
    const { sut, loadAuthenticationAdmApi } = makeSut()
    loadAuthenticationAdmApi.loadAdm.mockResolvedValueOnce(undefined)
    const sutResult = await sut.perform({ user: 'any_user', password: 'any_password' })
    expect(sutResult).toEqual(new AuthenticationError())
  })
})
