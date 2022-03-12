import { randomUUID } from 'crypto'

type BookParams = {
  id?: string
  name: string
  edition: number
  releaseYear: number
  releaseDate: Date
  conservationStateUsed: number
  conservationStateNew: number
  conservationStateDamaged: number
  institutionId: string
  institutionAddress: string
}
export namespace BookUpdateResult {
  export type Params = {
    edition: string
    conservationStateOld: string
    conservationStateNew: string
    institutionId: string
  }
}
export class Book {
  id: string
  name: string
  edition: number
  releaseYear: number
  releaseDate: Date
  conservationStateUsed: number
  conservationStateNew: number
  conservationStateDamaged: number
  institutionId: string
  institutionAddress: string

  constructor (params: BookParams) {
    this.id = randomUUID()
    this.name = params.name
    this.edition = params.edition
    this.releaseYear = params.releaseYear
    this.releaseDate = params.releaseDate
    this.conservationStateUsed = params.conservationStateUsed
    this.conservationStateNew = params.conservationStateNew
    this.conservationStateDamaged = params.conservationStateDamaged
    this.institutionId = params.institutionId
    this.institutionAddress = params.institutionAddress
  }

  /* updateAdmAccount (model: {
    edition: string
    conservationStateOld: string
    conservationStateNew: string
    institutionId: string
  }): BookUpdateResult.Params {
    return {
    }
  } */
}
