import { AddressComplet } from '@/domain/models'

export interface CreateInstitutionApi {
  createInstitution: (params: CreateInstitutionApi.Params) => Promise<void>
}
export namespace CreateInstitutionApi {
  export type Params = {
    name: string
    address: AddressComplet
    admId: string
  }
}
