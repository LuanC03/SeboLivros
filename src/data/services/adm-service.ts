import { AuthenticationAdmError, CreationAdmError } from '@/domain/errors'
import { TokenGenerator } from '@/data/contracts/crypto/token'
import { UpdateAdmAccountRepository, LoadAdmAccountRepository, CreateAdmAccountRepository, DeleteAdmAccountRepository, prismaClient } from '@/data/contracts/repos'
import { AccessToken } from '@/domain/models'
import { Administrator } from '@prisma/client'

export class AdmService {
  constructor (
    private readonly AdmAccountRepo:
    LoadAdmAccountRepository & CreateAdmAccountRepository &
    DeleteAdmAccountRepository & UpdateAdmAccountRepository,
    private readonly crypto: TokenGenerator
  ) { }

  async load (params: LoadAdmAccountRepository.Params): Promise<Administrator | AuthenticationAdmError> {
    const loadUser = await prismaClient.administrator.findFirst({ where: { username: params.username } })/* await this.AdmAccountRepo.loadAdm(params) */
    if (loadUser != null) {
      if (params.password === loadUser.password) {
        await this.crypto.generateToken({ token: loadUser.email, expirationInMs: AccessToken.expirationInMs })
        return loadUser
      }
    }
    return new AuthenticationAdmError()
  }

  async create (params: CreateAdmAccountRepository.Params): Promise<string | CreationAdmError> {
    try {
      if (validaParametrosCriacao(params)) {
        const adm = await prismaClient.administrator.create({
          data: {
            email: params.email,
            name: params.name,
            password: params.password,
            username: params.username
          }
        })
        return adm.email
      } else {
        throw new CreationAdmError('Parametros invalidos')
      }
    } catch (err) {
      return new CreationAdmError('Erro na criação')
    }
  }

  /* async delete (params: DeleteAdmAccountRepository.Params): Promise<string | DeleteAdmError> {
        try {
      if (validaParametrosDelete(params)) {

        await prismaClient.administrator.delete({
          where: {
            email: params.email
          }
        })
        return 'ADM Deletado'
      } else {

        throw new DeleteAdmError('id invalido')
      }
    } catch (err) {
      return new DeleteAdmError('Erro no delete')
    }
  } */
}
function validaParametrosCriacao (params: CreateAdmAccountRepository.Params): boolean {
  let result = true
  if (params.email === null || params.email === '') result = false
  else if (params.name === null || params.name === '') result = false
  else if (params.password === null || params.password === '') result = false
  else if (params.username === null || params.username === '') result = false
  return result
}
/* function validaParametrosDelete (params: DeleteAdmAccountRepository.Params): boolean {
  let result = true
  if (params.email === null || params.email === '') result = false
  return result
} */
