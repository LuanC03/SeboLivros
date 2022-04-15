/* import { TokenGenerator } from '@/data/contracts/crypto/token'
import { CreateAdmAccountRepository, LoadAdmAccountRepository, prismaClient, UpdateAdmAccountRepository } from '@/data/contracts/repos'
import { AdmService } from '@/data/services'
import { mock } from 'jest-mock-extended' */
import { prismaClient } from '@/data/contracts/repos'
import { Request, Response } from 'express'

export class AdminCreateController {
  async handle (req: Request, res: Response) {
    const { name, email, username, password } = req.body
    /*  const admAccountApi = mock<LoadAdmAccountRepository & CreateAdmAccountRepository & UpdateAdmAccountRepository>()
    const crypto = mock<TokenGenerator>()
    const service = new AdmService(admAccountApi, crypto) */

    try {
      const result = prismaClient.administrator.create({
        data: { name, email, username, password }
      })
      return res.status(201).json(result)
    } catch (error) {
      return res.status(400).json(error)
    }
    /* const result = await service.create({ name: name, email: email, username: user, password: password }) */
  };
}
