import { TokenGenerator } from '@/data/contracts/crypto/token'
import { UpdateAdmAccountRepository, LoadAdmAccountRepository, CreateAdmAccountRepository, DeleteAdmAccountRepository } from '@/data/contracts/repos/adm-account-repo'
import { AdmService } from '@/data/services'
import { AuthenticationAdmError } from '@/domain/errors'
/* import { AccessToken } from '@/domain/models' */

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: AdmService
  admAccountApi: MockProxy<LoadAdmAccountRepository & CreateAdmAccountRepository & DeleteAdmAccountRepository & UpdateAdmAccountRepository>
  crypto: MockProxy<TokenGenerator>
}

const makeSut = (): SutTypes => {
  const admAccountApi = mock<LoadAdmAccountRepository & CreateAdmAccountRepository & DeleteAdmAccountRepository & UpdateAdmAccountRepository>()
  const crypto = mock<TokenGenerator>()
  const sut = new AdmService(admAccountApi, crypto)
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
  it('testando a autenticação do ADM via user e password mockados', async () => {
    const { admAccountApi } = makeSut()

    await admAccountApi.loadAdm({ username: 'any_user', password: 'any_password' })

    expect(admAccountApi.loadAdm).toHaveBeenCalledWith({ username: 'any_user', password: 'any_password' })
  })

  it('testando erro na autenticação', async () => {
    const { sut } = makeSut()

    const sutResult = await sut.load({ username: 'any_user', password: 'any_passworad' })

    expect(sutResult).toEqual(new AuthenticationAdmError())
  })

  /* it('testando TokenGenerator', async () => {
    const { sut, admAccountApi, crypto } = makeSut()
    const adm = await admAccountApi.loadAdm({ username: 'any_user', password: 'any_password' })

    await sut.load({ username: 'any_user', password: 'any_password' })

    expect(crypto.generateToken).toHaveBeenCalledWith({
      token: adm?.email,
      expirationInMs: AccessToken.expirationInMs
    })
  }) */
})
