import { BookCreate } from '@/data/services'
import { randomUUID } from 'crypto'

export class Book {
  id: string
  name: string
  edition: number
  releaseYear: number
  releaseDate: Date
  conservationStateUsed: number
  conservationStateNew: number
  conservationStateDamaged: number
  libraryId: string
  institutionAddress: string

  constructor (params: BookCreate.Params) {
    this.id = params.id ?? randomUUID()
    this.name = params.name
    this.edition = params.edition
    this.releaseYear = params.releaseYear
    this.releaseDate = params.releaseDate
    this.conservationStateUsed = params.conservationStateUsed
    this.conservationStateNew = params.conservationStateNew
    this.conservationStateDamaged = params.conservationStateDamaged
    this.libraryId = params.libraryId
    this.institutionAddress = params.institutionAddress
  }
}
