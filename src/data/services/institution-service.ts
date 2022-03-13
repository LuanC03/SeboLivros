import { CreateInstitutionApi } from '@/data/contracts/apis'

export class InstitutionService {
  constructor (private readonly createInstitutionApi: CreateInstitutionApi) { }

  async createInstitution (params: CreateInstitutionApi.Params): Promise<void> {
    await this.createInstitutionApi.createInstitution(params)
  }
}
