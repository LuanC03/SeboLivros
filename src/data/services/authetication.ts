import { AuthenticationError } from '@/domain/errors'
import { LoadAdmAccountRepository, CreateAdmAccountRepository, UpdateAdmAccountRepository } from '@/data/contracts/repos'

export class AuthenticationService {
  constructor (
    private readonly AdmAccountRepo: LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository
  ) { }

  async perform (params: LoadAdmAccountRepository.Params): Promise<AuthenticationError> {
    const loadUser = await this.AdmAccountRepo.loadAdm(params)
    await this.AdmAccountRepo.createAdm({
      user: 'any_user',
      password: 'any_password',
      email: 'any_email',
      name: 'any_name'
    })
    if (loadUser !== undefined) {
      await this.AdmAccountRepo.updateAdm({
        password: loadUser.password,
        email: loadUser.email,
        name: loadUser.name
      })
    }
    return new AuthenticationError()
  }
}
