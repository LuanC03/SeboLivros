import { AuthenticationError } from '@/domain/errors'
import { Authentication } from '@/domain/features/authentication'
import { LoadAdmAccountRepository } from '@/data/contracts/repos'

export class AuthenticationService {
  constructor (
    private readonly loadAuthenticationAdmRepo: LoadAdmAccountRepository
  ) { }

  async perform (params: Authentication.Params): Promise<AuthenticationError> {
    await this.loadAuthenticationAdmRepo.loadAdm(params)
    return new AuthenticationError()
  }
}
