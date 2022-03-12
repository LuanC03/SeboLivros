import { AuthenticationError } from '@/domain/errors'
import { LoadAdmAccountRepository, CreateAdmAccountRepository, UpdateAdmAccountRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '@/data/contracts/crypto/token'

export class AuthenticationService {
  constructor (
    private readonly AdmAccountRepo: LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository,
    private readonly crypto: TokenGenerator
  ) { }

  async perform (params: LoadAdmAccountRepository.Params): Promise<AuthenticationError> {
    const loadUser = await this.AdmAccountRepo.loadAdm(params)
    await this.AdmAccountRepo.createAdm({
      username: 'any_user',
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
      await this.crypto.generateToken({ token: loadUser.email })
    }
    return new AuthenticationError()
  }
}
