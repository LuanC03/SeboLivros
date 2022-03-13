import { InstitutionFeature } from '@/domain/features'

class InstitutionService {
  constructor (private readonly createInstitutionApi: CreateInstitutionApi) {}

  async createInstitution (params: InstitutionFeature.Params): Promise<void> {
    await this.createInstitutionApi.createInstitution(params)
  }
}
interface CreateInstitutionApi{
  createInstitution: (params: InstitutionFeature.Params) => Promise<void>
}

class CreateInstitutionApiSpy implements CreateInstitutionApi {
  params?: InstitutionFeature.Params
  async createInstitution (params: InstitutionFeature.Params): Promise<void> {
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
