import { CreateInstitutionApi } from '@/data/contracts/apis'
import { InstitutionService } from '@/data/services'

class CreateInstitutionApiSpy implements CreateInstitutionApi {
  params?: CreateInstitutionApi.Params
  async createInstitution (params: CreateInstitutionApi.Params): Promise<void> {
    this.params = params
  }
}
describe('InstitutionService', () => {
  it('', async () => {
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
})
