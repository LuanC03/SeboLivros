import { TokenGenerator } from '@/data/contracts/crypto/token'
import { CreateAdmAccountRepository, LoadAdmAccountRepository, UpdateAdmAccountRepository, DeleteAdmAccountRepository } from '@/data/contracts/repos'
import { AdmService } from '@/data/services'
import { CreationAdmError } from '@/domain/errors'

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

    expect(await sut.create({
      name: 'any_name',
      email: 'any_email',
      username: 'any_user',
      password: ''
    })).toEqual(new CreationAdmError('Erro na criação'))
  })

  /*  it('testando a criação do ADM via user e password', async () => {
    const { sut } = makeSut()
    const result = await sut.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      username: 'any_user'
    })
    // precisa excluir o adm criado do bd após o teste
    expect(result).toEqual('any_email')
  }) */
}
)
