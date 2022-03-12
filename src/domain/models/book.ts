import { randomUUID } from 'crypto'
import { UpdateBookError } from '../errors'

export enum ConservationStateBook{
  Novo = 'novo',
  Usado = 'usado',
  Danificado = 'danificado'
}
export namespace BookUpdate {
  export type Params = {
    edition?: number
    conservationStateOld?: string
    conservationStateNew?: string
    numberOfBooksChanged?: number
    institutionId?: string
  }
  export type Result = {
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
  }| UpdateBookError
}
export namespace BookCreate {
  export type Params ={
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
  export type Result = Params
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

  constructor (params: BookCreate.Params) {
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

  getNumberOfBooks (conservationState: string): number {
    let result: number
    if (ConservationStateBook.Novo === conservationState) result = this.conservationStateNew
    else if (ConservationStateBook.Usado === conservationState) result = this.conservationStateUsed
    else if (ConservationStateBook.Danificado === conservationState) result = this.conservationStateDamaged
    else result = -1
    return result
  }

  setNumberOfBooks (numberOfBooks: number, conservationState: string): void {
    if (ConservationStateBook.Novo === conservationState) {
      this.conservationStateNew += numberOfBooks
    } else if (ConservationStateBook.Usado === conservationState) {
      this.conservationStateUsed += numberOfBooks
    } else if (ConservationStateBook.Danificado === conservationState) {
      this.conservationStateDamaged += numberOfBooks
    }
  }

  updateBook (model: BookUpdate.Params): BookUpdate.Result | UpdateBookError {
    if (model.institutionId !== undefined && model.institutionId !== this.institutionId) {
      this.institutionId = model.institutionId
    }
    if (model.edition !== undefined && model.edition !== this.edition) {
      this.edition = model.edition
    }
    if (model.conservationStateOld !== undefined && model.conservationStateNew !== undefined && model.numberOfBooksChanged !== undefined) {
      const numberBooksStateOld = this.getNumberOfBooks(model.conservationStateOld)
      const numberBooksStateNew = this.getNumberOfBooks(model.conservationStateNew)
      if (numberBooksStateOld >= 0 && numberBooksStateNew >= 0) {
        if (numberBooksStateOld - model.numberOfBooksChanged >= 0) {
          this.setNumberOfBooks(-1 * model.numberOfBooksChanged, model.conservationStateOld)
          this.setNumberOfBooks(model.numberOfBooksChanged, model.conservationStateNew)
        }
      } else {
        return new UpdateBookError()
      }
    }
    return {
      id: this.id,
      name: this.name,
      edition: this.edition,
      releaseYear: this.releaseYear,
      releaseDate: this.releaseDate,
      conservationStateUsed: this.conservationStateUsed,
      conservationStateNew: this.conservationStateNew,
      conservationStateDamaged: this.conservationStateDamaged,
      institutionId: this.institutionId,
      institutionAddress: this.institutionAddress
    }
  }
}
