import { AdmAccount } from '@/domain/models'

describe('Adm-Account-Update', () => {
  function makeSut (): AdmAccount {
    return new AdmAccount({
      username: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
  }

  it('testando o update do ADM via todos os parametros', async () => {
    const sut = makeSut()

    expect(sut.updateAdmAccount({
      password: 'new_password',
      email: 'new_email',
      name: 'new_name'
    })).toEqual({
      password: 'new_password',
      email: 'new_email',
      name: 'new_name'
    })
  })

  it('testando o update do ADM, alterando senha e nome', async () => {
    const sut = makeSut()

    expect(sut.updateAdmAccount({
      password: 'new_password',
      name: 'new_name'
    })).toEqual({
      password: 'new_password',
      email: 'any_email',
      name: 'new_name'
    })
  })

  it('testando o update do ADM, alterando senha e email', async () => {
    const sut = makeSut()

    expect(sut.updateAdmAccount({
      password: 'new_password',
      email: 'new_email'
    })).toEqual({
      password: 'new_password',
      email: 'new_email',
      name: 'any_name'
    })
  })

  it('testando o update do ADM, alterando email e nome', async () => {
    const sut = makeSut()

    expect(sut.updateAdmAccount({
      email: 'new_email',
      name: 'new_name'
    })).toEqual({
      password: 'any_password',
      email: 'new_email',
      name: 'new_name'
    })
  })

  it('testando o update do ADM, alterando um unico parametro', async () => {
    const sut = makeSut()

    expect(sut.updateAdmAccount({
      password: 'new_password'
    })).toEqual({
      password: 'new_password',
      email: 'any_email',
      name: 'any_name'
    })
  })
})
