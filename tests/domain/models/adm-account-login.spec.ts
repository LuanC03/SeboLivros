import { LoadAdmAccountRepository, CreateAdmAccountRepository, UpdateAdmAccountRepository } from '@/data/contracts/repos'
import { AuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: AuthenticationService
  admAccountApi: MockProxy<LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository>
}

const makeSut = (): SutTypes => {
  const admAccountApi = mock<LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository>()
  const sut = new AuthenticationService(admAccountApi)
  admAccountApi.loadAdm.mockResolvedValue({
    name: 'any_name',
    email: 'any_email',
    user: 'any_user',
    password: 'any_password',
    id: 123
  })
  return { sut, admAccountApi }
}
describe('AuthenticationService', () => {
  it('testando a autenticação do ADM via user e password', async () => {
    const { sut, admAccountApi } = makeSut()
    await sut.perform({ user: 'any_user', password: 'any_password' })
    expect(admAccountApi.loadAdm).toHaveBeenCalledWith({ user: 'any_user', password: 'any_password' })
  })

  it('testando erro na autenticação', async () => {
    const { sut, admAccountApi } = makeSut()
    admAccountApi.loadAdm.mockResolvedValueOnce(undefined)
    const sutResult = await sut.perform({ user: 'any_user', password: 'any_password' })
    expect(sutResult).toEqual(new AuthenticationError())
  })
})
