import { AuthenticationError } from '@/domain/errors'
import { Authentication } from '@/domain/features/authentication'

class AuthenticationService {
  constructor (
    private readonly loadAuthenticationAdmApi: LoadAuthenticationAdmApi
  ) {}

  async perform (params: Authentication.Params): Promise<AuthenticationError> {
    await this.loadAuthenticationAdmApi.loadAdm(params)
    return new AuthenticationError()
  }
}

interface LoadAuthenticationAdmApi{
  loadAdm: (params: LoadAuthenticationAdmApi.Params) => Promise<LoadAuthenticationAdmApi.Result>
}

namespace LoadAuthenticationAdmApi{
  export type Params ={
    user: string
    password: string
  }

  export type Result = undefined
}

class LoadAuthenticationAdmApiSpy implements LoadAuthenticationAdmApi {
  user?: string
  password?: string
  result = undefined

  async loadAdm (params: LoadAuthenticationAdmApi.Params): Promise<LoadAuthenticationAdmApi.Result> {
    this.password = params.password
    this.user = params.user
    return this.result
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

  it('testando erro na autenticação', async () => {
    const loadAuthenticationAdmApi = new LoadAuthenticationAdmApiSpy()
    loadAuthenticationAdmApi.result = undefined
    const sut = new AuthenticationService(loadAuthenticationAdmApi)

    const sutResult = await sut.perform({ user: 'any_user', password: 'any_password' })

    expect(sutResult).toEqual(new AuthenticationError())
  })
})
