import { AccessToken } from '@/domain/models'

describe('AccessToken', () => {
  it('Criando token de acesso com um valor', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })

  it('Teste de expiração do token em 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toBe(1800000)
  })
})
