import { CreationAdmError } from '@/domain/errors'

export interface LoadAdmAccountRepository {
  loadAdm: (params: LoadAdmAccountRepository.Params) => Promise<LoadAdmAccountRepository.ResultAdm>
}

export namespace LoadAdmAccountRepository {
  export type Params = {
    username: string
    password: string
  }

  export type ResultAdm = {
    name: string
    email: string
    username: string
    id: number
    password: string
  } | undefined
}

export interface CreateAdmAccountRepository {
  createAdm: (params: CreateAdmAccountRepository.Params) => Promise<CreateAdmAccountRepository.Result>
}

export namespace CreateAdmAccountRepository {
  export type Params = {
    username: string
    password: string
    email: string
    name: string
  }
  export type Result = {
    name: string
    email: string
    username: string
    password: string
  } | CreationAdmError
}

export interface UpdateAdmAccountRepository {
  updateAdm: (params: UpdateAdmAccountRepository.Params) => Promise<UpdateAdmAccountRepository.Result>
}

export namespace UpdateAdmAccountRepository {
  export type Params = {
    password: string
    email: string
    name: string
  }
  export type Result = {
    id: number
    name: string
    email: string
    password: string
    username: string
  }

}
