import { AddressComplet } from '@/domain/models'

export interface InstitutionFeature {
  createInstitution: (params: InstitutionFeature.Params) => Promise<void>
}

export namespace InstitutionFeature{
  export type Params={
    name: string
    address: AddressComplet
    admId: string
  }

}
