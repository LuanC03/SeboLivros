import { CreateInstitutionApi } from '@/data/contracts/apis'
import { InstitutionService } from '@/data/services'
import { Institution } from '@/domain/models'

class CreateInstitutionApiSpy implements CreateInstitutionApi {
  params?: CreateInstitutionApi.Params
  async createInstitution (params: CreateInstitutionApi.Params): Promise<void> {
    this.params = params
  }
}
describe('InstitutionService', () => {
  it('Testando a criação de uma instituição via service', async () => {
    const createInstitutionApi = new CreateInstitutionApiSpy()
    const sut = new InstitutionService(createInstitutionApi)

    await sut.createInstitution({
      name: 'any_name',
      address: {
        street: 'any_street',
        number: 'any_number',
        district: 'any_district',
        city: 'any_city',
        uf: 'any_uf',
        complement: 'any_complement',
        cep: 123
      },
      admId: 'any_id'
    })

    expect(createInstitutionApi.params).toStrictEqual({
      name: 'any_name',
      address: {
        street: 'any_street',
        number: 'any_number',
        district: 'any_district',
        city: 'any_city',
        uf: 'any_uf',
        complement: 'any_complement',
        cep: 123
      },
      admId: 'any_id'
    })
  })
  it('Testando a criação de uma instituição via model', async () => {
    const sut = new Institution({
      id: '123',
      name: 'any_name',
      institutionAddress: {
        street: 'any_street',
        number: 'any_number',
        district: 'any_district',
        city: 'any_city',
        uf: 'any_uf',
        complement: 'any_complement',
        cep: 123
      },
      admId: 'any_id'
    })

    expect(sut).toEqual({
      id: sut.id,
      name: 'any_name',
      institutionAddress: {
        street: 'any_street',
        number: 'any_number',
        district: 'any_district',
        city: 'any_city',
        uf: 'any_uf',
        complement: 'any_complement',
        cep: 123
      },
      admId: 'any_id'
    })
  })
})
