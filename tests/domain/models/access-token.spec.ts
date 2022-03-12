import { AccessToken } from '@/domain/models'

describe('AccessToken', () => {
  it('Criando token de acesso com um valor', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })
})
