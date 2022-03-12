import { TokenGenerator } from '@/data/contracts/crypto/token'
import { UpdateAdmAccountRepository, LoadAdmAccountRepository, CreateAdmAccountRepository } from '@/data/contracts/repos/adm-account'
import { AuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'
import { AccessToken } from '@/domain/models'

type SutTypes = {
  sut: AuthenticationService
  admAccountApi: MockProxy<LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository>
  crypto: MockProxy<TokenGenerator>
}

const makeSut = (): SutTypes => {
  const admAccountApi = mock<LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository>()
  const crypto = mock<TokenGenerator>()
  const sut = new AuthenticationService(admAccountApi, crypto)
  admAccountApi.createAdm.mockResolvedValue({
    name: 'any_name',
    email: 'any_email',
    username: 'any_user',
    password: 'any_password'
  })
  admAccountApi.loadAdm.mockResolvedValue({
    name: 'any_name',
    email: 'any_email',
    username: 'any_user',
    password: 'any_password',
    id: 123
  })
  return { sut, admAccountApi, crypto }
}
describe('AuthenticationService', () => {
  it('testando a autenticação do ADM via user e password', async () => {
    const { sut, admAccountApi } = makeSut()

    await sut.perform({ username: 'any_user', password: 'any_password' })

    expect(admAccountApi.loadAdm).toHaveBeenCalledWith({ username: 'any_user', password: 'any_password' })
  })

  it('testando erro na autenticação', async () => {
    const { sut } = makeSut()

    const sutResult = await sut.perform({ username: 'any_user', password: 'any_password' })

    expect(sutResult).toEqual(new AuthenticationError())
  })

  it('testando TokenGenerator', async () => {
    const { sut, admAccountApi, crypto } = makeSut()
    const adm = await admAccountApi.loadAdm({ username: 'any_user', password: 'any_password' })

    await sut.perform({ username: 'any_user', password: 'any_password' })

    expect(crypto.generateToken).toHaveBeenCalledWith({ token: adm?.email, expirationInMs: AccessToken.expirationInMs })
  })
})
