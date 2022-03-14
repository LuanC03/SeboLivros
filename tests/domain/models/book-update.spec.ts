import { BookService } from '@/data/services'
import { UpdateBookError } from '@/domain/errors'

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

  it('testando o update do livro via todos os parametros', async () => {
    const sut = makeSut()

    expect(sut.updateBook({
      bookId: sut.id!,
      edition: 5,
      conservationStateOld: 'novo',
      conservationStateNew: 'usado',
      numberOfBooksChanged: 2,
      libraryId: '345'
    })).toEqual({
      id: '123',
      name: 'Livro1',
      edition: 5,
      releaseYear: 2012,
      releaseDate: new Date(21 / 10 / 2012),
      conservationStateUsed: 12,
      conservationStateNew: 11,
      conservationStateDamaged: 2,
      libraryId: '345',
      institutionAddress: 'any_address'
    })
  })
  it('testando o update do livro, utilizando só a edição', async () => {
    const sut = makeSut()

    expect(sut.updateBook({
      bookId: sut.id!,
      edition: 5
    })).toEqual({
      id: sut.id,
      name: 'Livro1',
      edition: 5,
      releaseYear: 2012,
      releaseDate: new Date(21 / 10 / 2012),
      conservationStateUsed: 10,
      conservationStateNew: 13,
      conservationStateDamaged: 2,
      libraryId: 'any_Id',
      institutionAddress: 'any_address'
    })
  })
  it('testando o update do livro, utilizando só o Id da Instituição', async () => {
    const sut = makeSut()

    expect(sut.updateBook({
      bookId: sut.id!,
      libraryId: '123'
    })).toEqual({
      id: sut.id,
      name: 'Livro1',
      edition: 3,
      releaseYear: 2012,
      releaseDate: new Date(21 / 10 / 2012),
      conservationStateUsed: 10,
      conservationStateNew: 13,
      conservationStateDamaged: 2,
      libraryId: '123',
      institutionAddress: 'any_address'
    })
  })
  it('testando o update do livro, alterando as quatidades dos livros', async () => {
    const sut = makeSut()

    expect(sut.updateBook({
      bookId: sut.id!,
      conservationStateOld: 'novo',
      conservationStateNew: 'danificado',
      numberOfBooksChanged: 3
    })).toEqual({
      id: sut.id,
      name: 'Livro1',
      edition: 3,
      releaseYear: 2012,
      releaseDate: new Date(21 / 10 / 2012),
      conservationStateUsed: 10,
      conservationStateNew: 10,
      conservationStateDamaged: 5,
      libraryId: 'any_Id',
      institutionAddress: 'any_address'
    })
  })
  it('testando o erro no update do livro, passando parametro de conservação inexistente', async () => {
    const sut = makeSut()

    expect(sut.updateBook({
      bookId: sut.id!,
      conservationStateOld: 'Estado erradoaa',
      conservationStateNew: 'danificado',
      numberOfBooksChanged: 3
    })).toEqual(new UpdateBookError('O tipo de conservação não existe!'))
  })
})
