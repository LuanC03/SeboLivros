import { BookUpdate } from '@/data/services'
import { UpdateBookError } from '@/domain/errors'

export interface BookApi{
  getNumberOfBooks: (conservationState: string) => number
  setNumberOfBooks: (numberOfBooks: number, conservationState: string) => void
  updateBook: (model: BookUpdate.Params) => BookUpdate.Result | UpdateBookError

}
