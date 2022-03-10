/* import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors' */

export interface LoadAdmAccountRepository {
  loadAdm: (params: LoadAdmAccountRepository.Params) => Promise<LoadAdmAccountRepository.Result>
}

export namespace LoadAdmAccountRepository {
  export type Params = {
    user: string
    password: string
  }

  export type Result = undefined
}
