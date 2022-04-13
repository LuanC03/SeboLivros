import { Request, Response, Router } from 'express'
import { prismaClient } from '@/data/contracts/repos'

export default (router: Router): void => {
  router.post('/api/adm', (req: Request, res: Response) => {
    const { name, email, username, password } = req.body
    const adm = prismaClient.administrator.create({
      data: { name, email, username, password }
    })
    res.status(201).send(adm)
  })
}
