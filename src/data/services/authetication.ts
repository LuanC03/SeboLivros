import { AuthenticationError } from '@/domain/errors'
import { LoadAdmAccountRepository, CreateAdmAccountRepository } from '@/data/contracts/repos'

export class AuthenticationService {
  constructor (
    private readonly loadAdmRepo: LoadAdmAccountRepository,
    private readonly createAdmRepo: CreateAdmAccountRepository
  ) { }

  async perform (params: LoadAdmAccountRepository.Params): Promise<AuthenticationError> {
    await this.loadAdmRepo.loadAdm(params)
    await this.createAdmRepo.createAdm({
      user: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
    return new AuthenticationError()
  }
}
