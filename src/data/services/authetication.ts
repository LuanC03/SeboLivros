import { AuthenticationError } from '@/domain/errors'
import { Authentication } from '@/domain/features/authentication'
import { LoadAuthenticationAdmApi } from '@/data/contracts/apis'

export class AuthenticationService {
  constructor (
    private readonly loadAuthenticationAdmApi: LoadAuthenticationAdmApi
  ) { }

  async perform (params: Authentication.Params): Promise<AuthenticationError> {
    await this.loadAuthenticationAdmApi.loadAdm(params)
    return new AuthenticationError()
  }
}
