import { AdmAccount } from '@/domain/models'

describe('Adm-Account-Update', () => {
  it('testando o update do ADM via todos os parametros', async () => {
    const sut = new AdmAccount({
      username: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
    // alterando todos os 3 atributos
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
  it('testando o update do ADM via todos os parametros', async () => {
    const sut = new AdmAccount({
      username: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
    // alterando senha e nome
    expect(sut.updateAdmAccount({
      password: 'new_password',
      name: 'new_name'
    })).toEqual({
      password: 'new_password',
      email: 'any_email',
      name: 'new_name'
    })
  })
  it('testando o update do ADM via todos os parametros', async () => {
    const sut = new AdmAccount({
      username: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
    // alterando senha e email
    expect(sut.updateAdmAccount({
      password: 'new_password',
      email: 'new_email'
    })).toEqual({
      password: 'new_password',
      email: 'new_email',
      name: 'any_name'
    })
  })
  it('testando o update do ADM via todos os parametros', async () => {
    const sut = new AdmAccount({
      username: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
    // alterando nome e email
    expect(sut.updateAdmAccount({
      email: 'new_email',
      name: 'new_name'
    })).toEqual({
      password: 'any_password',
      email: 'new_email',
      name: 'new_name'
    })
  })
  it('testando o update do ADM via todos os parametros', async () => {
    const sut = new AdmAccount({
      username: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
    // alterando somente a senha
    expect(sut.updateAdmAccount({
      password: 'new_password'
    })).toEqual({
      password: 'new_password',
      email: 'any_email',
      name: 'any_name'
    })
  })
})
