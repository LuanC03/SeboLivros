import { TokenGenerator } from '@/data/contracts/crypto/token'
import { CreateAdmAccountRepository, LoadAdmAccountRepository, UpdateAdmAccountRepository } from '@/data/contracts/repos'
import { mock } from 'jest-mock-extended'
import { AdmService } from '@/data/services'
import { Request, Response } from 'express'

export class AdminCreateController {
  async handle (req: Request, res: Response) {
    const admAccountApi = mock<LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository>()
    const crypto = mock<TokenGenerator>()
    const service = new AdmService(admAccountApi, crypto)
    const { name, email, username, password } = req.body

    return res.status(201).send(await service.create({ name: name, email: email, username: username, password: password }))
  };
}
