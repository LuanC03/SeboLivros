/* import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors' */

import { UpdateBookError } from '@/domain/errors'
import { Book } from '@/domain/models'

export interface CreateBookRepository {
  createBook: (params: CreateBookRepository.Params) => Promise<Book>
}

export namespace CreateBookRepository {
  export type Params = {
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
  }
}

export interface UpdateBookRepository {
  updateBook: (params: UpdateBookRepository.Params) => Promise<UpdateBookRepository.Result>
}

export namespace UpdateBookRepository {
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
  } | UpdateBookError

}
