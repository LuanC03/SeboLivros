import { AdmAccount } from '@/domain/models'

describe('Adm-Account-Create', () => {
  function makeSut (): AdmAccount {
    return new AdmAccount({
      username: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
  }

  it('testando a criação do ADM via parametros', async () => {
    const sut = makeSut()

    expect(sut).toEqual({
      id: sut.id,
      username: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
  })
})
