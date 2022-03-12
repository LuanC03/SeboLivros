import { AuthenticationError } from '@/domain/errors'
import { TokenGenerator } from '@/data/contracts/crypto/token'
import { UpdateAdmAccountRepository, LoadAdmAccountRepository, CreateAdmAccountRepository } from '../contracts/repos/adm-account'
import { AccessToken } from '@/domain/models'

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
      await this.crypto.generateToken({ token: loadUser.email, expirationInMs: AccessToken.expirationInMs })
    }
    return new AuthenticationError()
  }
}
