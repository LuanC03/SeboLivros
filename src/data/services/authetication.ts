import { AuthenticationError } from '@/domain/errors'
import { LoadAdmAccountRepository, CreateAdmAccountRepository } from '@/data/contracts/repos'

export class AuthenticationService {
  constructor (
    private readonly AdmAccountRepo: LoadAdmAccountRepository & CreateAdmAccountRepository
  ) { }

  async perform (params: LoadAdmAccountRepository.Params): Promise<AuthenticationError> {
    await this.AdmAccountRepo.loadAdm(params)
    await this.AdmAccountRepo.createAdm({
      user: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
    return new AuthenticationError()
  }
}
