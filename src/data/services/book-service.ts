import { UpdateBookError } from '@/domain/errors'
import { Book } from '@/domain/models'
import { randomUUID } from 'crypto'
import { BookApi } from '../contracts/apis/book-api'
export enum ConservationStateBook {
  Novo = 'novo',
  Usado = 'usado',
  Danificado = 'danificado'
}
export namespace BookUpdate {
  export type Params = {
    edition?: number
    bookId: string
    conservationStateOld?: string
    conservationStateNew?: string
    numberOfBooksChanged?: number
    libraryId?: string
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
    libraryId: string
    institutionAddress: string
  } | UpdateBookError
}
export namespace BookCreate {
  export type Params = {
    id?: string
    name: string
    edition: number
    releaseYear: number
    releaseDate: Date
    conservationStateUsed: number
    conservationStateNew: number
    conservationStateDamaged: number
    libraryId: string
    institutionAddress: string
  }
  export type Result = Params
}
export class BookService implements BookApi {
  id?: string
  name: string
  edition: number
  releaseYear: number
  releaseDate: Date
  conservationStateUsed: number
  conservationStateNew: number
  conservationStateDamaged: number
  libraryId: string
  institutionAddress: string

  constructor (book: Book) {
    this.id = book.id ?? randomUUID()
    this.name = book.name
    this.edition = book.edition
    this.releaseYear = book.releaseYear
    this.releaseDate = book.releaseDate
    this.conservationStateUsed = book.conservationStateUsed
    this.conservationStateNew = book.conservationStateNew
    this.conservationStateDamaged = book.conservationStateDamaged
    this.libraryId = book.libraryId
    this.institutionAddress = book.institutionAddress
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
    if (model.bookId !== undefined && model.bookId === this.id) {
      if (model.libraryId !== undefined && model.libraryId !== this.libraryId) {
        this.libraryId = model.libraryId
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
          } else {
            return new UpdateBookError('Quantidade insuficiente!')
          }
        } else {
          return new UpdateBookError('O tipo de conservação não existe!')
        }
      }
    } else { return new UpdateBookError('O Livro não foi encontrado!') }
    return {
      id: this.id,
      name: this.name,
      edition: this.edition,
      releaseYear: this.releaseYear,
      releaseDate: this.releaseDate,
      conservationStateUsed: this.conservationStateUsed,
      conservationStateNew: this.conservationStateNew,
      conservationStateDamaged: this.conservationStateDamaged,
      libraryId: this.libraryId,
      institutionAddress: this.institutionAddress
    }
  }
}
