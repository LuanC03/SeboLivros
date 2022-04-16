import { AuthenticationAdmError, CreationAdmError } from '@/domain/errors'
import { TokenGenerator } from '@/data/contracts/crypto/token'
import { UpdateAdmAccountRepository, LoadAdmAccountRepository, CreateAdmAccountRepository, prismaClient } from '@/data/contracts/repos'
import { AccessToken } from '@/domain/models'
import { Administrator } from '@prisma/client'

export class AdmService {
  constructor (
    private readonly AdmAccountRepo: LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository,
    private readonly crypto: TokenGenerator
  ) { }

  async load (params: LoadAdmAccountRepository.Params): Promise<Administrator | AuthenticationAdmError> {
    const loadUser = await prismaClient.administrator.findFirst({ where: { username: params.username } })/* await this.AdmAccountRepo.loadAdm(params) */
    /* console.log(loadUser?.email) */
    if (loadUser != null) {
      if (params.password === loadUser.password) {
        await this.crypto.generateToken({ token: loadUser.email, expirationInMs: AccessToken.expirationInMs })
        return loadUser
      }
    }
    return new AuthenticationAdmError()
  }

  async create (params: CreateAdmAccountRepository.Params): Promise<String | CreationAdmError> {
    try {
      await prismaClient.administrator.create({
        data: {
          email: params.email,
          name: params.name,
          password: params.password,
          username: params.username
        }
      })
      return 'ADM Criado'
    } catch {
      return new CreationAdmError('Erro na criação')
    }
  }
}
