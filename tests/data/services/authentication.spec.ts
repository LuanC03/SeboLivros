import { Authentication } from '@/domain/features/authentication'

class AuthenticationService {
  constructor (
    private readonly loadAuthenticationAdmApi: LoadAuthenticationAdmApi
  ) {}

  async perform (params: Authentication.Params): Promise<void> {
    await this.loadAuthenticationAdmApi.loadAdm(params)
  }
}

interface LoadAuthenticationAdmApi{
  loadAdm: (params: LoadAuthenticationAdmApi.Params) => Promise<void>
}

namespace LoadAuthenticationAdmApi{
  export type Params ={
    user: string
    password: string
  }
}

class LoadAuthenticationAdmApiSpy implements LoadAuthenticationAdmApi {
  user?: string
  password?: string

  async loadAdm (params: LoadAuthenticationAdmApi.Params): Promise<void> {
    this.password = params.password
    this.user = params.user
  }
}
describe('AuthenticationService', () => {
  it('testando a autenticação do ADM via user e password', async () => {
    const loadAuthenticationAdmApi = new LoadAuthenticationAdmApiSpy()
    const sut = new AuthenticationService(loadAuthenticationAdmApi)

    await sut.perform({ user: 'any_user', password: 'any_password' })

    expect(loadAuthenticationAdmApi.user).toBe('any_user')
    expect(loadAuthenticationAdmApi.password).toBe('any_password')
  })
})
