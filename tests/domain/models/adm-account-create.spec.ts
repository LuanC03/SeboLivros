import { TokenGenerator } from '@/data/contracts/crypto/token'
import { CreateAdmAccountRepository, LoadAdmAccountRepository, UpdateAdmAccountRepository } from '@/data/contracts/repos'
import { AdmService } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'
import { CreationAdmError } from '@/domain/errors'

type SutTypes = {
  sut: AdmService
  admAccountApi: MockProxy<LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository>
  crypto: MockProxy<TokenGenerator>
}

const makeSut = (): SutTypes => {
  const admAccountApi = mock<LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository>()
  const crypto = mock<TokenGenerator>()
  const sut = new AdmService(admAccountApi, crypto)
  admAccountApi.createAdm.mockResolvedValue({
    name: 'any_name',
    email: 'any_email',
    username: 'any_user',
    password: 'any_password'
  })
  return { sut, admAccountApi, crypto }
}
describe('Adm-Account-Create', () => {
  it('testando a criação do ADM via user e password mockados', async () => {
    const { admAccountApi } = makeSut()

    await admAccountApi.createAdm({
      name: 'any_name',
      email: 'any_email',
      username: 'any_user',
      password: 'any_password'
    })

    expect(admAccountApi.createAdm).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      username: 'any_user',
      password: 'any_password'
    })
  })

  it('testando erro na criação mockada', async () => {
    const { sut } = makeSut()

    const sutResult = await sut.create({
      name: 'any_name',
      email: 'any_email',
      username: 'any_user',
      password: ''
    })

    expect(sutResult).toEqual(new CreationAdmError('Erro na criação'))
  })

  /*  it('testando a autenticação do ADM via user e password', async () => {
    const { sut } = makeSut()
    const adm = await sut.create({
      name: 'any_name',
      email: 'any_email',
      username: 'any_user',
      password: 'any_password'
    })
    const load = await sut.load({ username: 'any_user1', password: 'any_password' })
    console.log(load.toString)
    expect(adm).toStrictEqual(load)
  }) */
}
)
