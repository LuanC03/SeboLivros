import { AddressComplet } from '@/domain/models'
import { randomUUID } from 'crypto'

export class Institution {
  id: string
  institutionAddress: AddressComplet
  name: string
  admId: string

  constructor (model: { id?: string, institutionAddress: AddressComplet, name: string, admId: string}) {
    this.id = model.id ?? randomUUID()
    this.name = model.name
    this.admId = model.admId
    this.institutionAddress = model.institutionAddress
  }
}
