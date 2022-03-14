import { BookService } from '@/data/services'
import { Book } from '@/domain/models'

describe('Book-Create', () => {
  function makeSut (): BookService {
    return new BookService({
      id: '123',
      name: 'Livro1',
      edition: 3,
      releaseYear: 2012,
      releaseDate: new Date(21 / 10 / 2012),
      conservationStateUsed: 10,
      conservationStateNew: 13,
      conservationStateDamaged: 2,
      libraryId: 'any_Id',
      institutionAddress: 'any_address'
    })
  }

  it('testando a criação do livro via parametros no service', async () => {
    const sut = makeSut()

    expect(sut).toEqual({
      id: sut.id,
      name: 'Livro1',
      edition: 3,
      releaseYear: 2012,
      releaseDate: new Date(21 / 10 / 2012),
      conservationStateUsed: 10,
      conservationStateNew: 13,
      conservationStateDamaged: 2,
      libraryId: 'any_Id',
      institutionAddress: 'any_address'
    })
  })

  it('testando a criação do livro via parametros, no modelo', async () => {
    const sut = new Book({
      id: '123',
      name: 'Livro1',
      edition: 3,
      releaseYear: 2012,
      releaseDate: new Date(21 / 10 / 2012),
      conservationStateUsed: 10,
      conservationStateNew: 13,
      conservationStateDamaged: 2,
      libraryId: 'any_Id',
      institutionAddress: 'any_address'
    })

    expect(sut).toEqual({
      id: sut.id,
      name: 'Livro1',
      edition: 3,
      releaseYear: 2012,
      releaseDate: new Date(21 / 10 / 2012),
      conservationStateUsed: 10,
      conservationStateNew: 13,
      conservationStateDamaged: 2,
      libraryId: 'any_Id',
      institutionAddress: 'any_address'
    })
  })
})
