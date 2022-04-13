import { AuthenticationAdmError } from '@/domain/errors'
import { TokenGenerator } from '@/data/contracts/crypto/token'
import { UpdateAdmAccountRepository, LoadAdmAccountRepository, CreateAdmAccountRepository, prismaClient } from '@/data/contracts/repos'
import { AccessToken, AdmAccount } from '@/domain/models'

export class AdmService {
  constructor (
    private readonly AdmAccountRepo: LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository,
    private readonly crypto: TokenGenerator
  ) { }

  async load (params: LoadAdmAccountRepository.Params): Promise<AdmAccount | AuthenticationAdmError> {
    const loadUser = await prismaClient.administrator.findFirst({ where: { username: params.username } })/* await this.AdmAccountRepo.loadAdm(params) */
    console.log(loadUser?.email)
    if (loadUser != null) {
      await this.crypto.generateToken({ token: loadUser.email, expirationInMs: AccessToken.expirationInMs })
    }
    return new AuthenticationAdmError()
  }

  async create (params: CreateAdmAccountRepository.Params): Promise<AdmAccount | AuthenticationAdmError> {
    const loadUser = await this.AdmAccountRepo.loadAdm(params)
    console.log(loadUser?.email)
    if (loadUser !== undefined) {
      await this.crypto.generateToken({ token: loadUser.email, expirationInMs: AccessToken.expirationInMs })
    }
    return new AuthenticationAdmError()
  }
}
