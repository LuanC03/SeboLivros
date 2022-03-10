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

  export type Result = undefined | {
    name: string
    email: string
    user: string
    id: number
    password: string
  }
}

export interface CreateAdmAccountRepository {
  createAdm: (params: CreateAdmAccountRepository.Params) => Promise<void>
}

export namespace CreateAdmAccountRepository {
  export type Params = {
    user: string
    password: string
    email: string
    name: string
  }
}

export interface UpdateAdmAccountRepository {
  updateAdm: (params: UpdateAdmAccountRepository.Params) => Promise<void>
}

export namespace UpdateAdmAccountRepository {
  export type Params = {
    password: string
    email: string
    name: string
  }

}
