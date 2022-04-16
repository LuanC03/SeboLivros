import { Request, Response, Router } from 'express'
import { prismaClient } from '@/data/contracts/repos'
import { AdminCreateController } from '@/application/controllers'

export default (router: Router): void => {
  router.post('/api/adm/', new AdminCreateController().handle)

  router.get('/api/adm/', /* new AdminCreateController().handle) */async (req: Request, res: Response) => {
    const { name, email, username, password } = req.body
    console.log(name)
    try {
      const adm = await prismaClient.administrator.findFirst({ where: { name, email, username, password } })
      console.log(adm)
      res.status(302).send(adm)
    } catch (error) {
      res.status(404).send(error)
    }
  })
  router.delete('/api/adm/', /* new AdminCreateController().handle) */async (req: Request, res: Response) => {
    const { name, email, username, password } = req.body
    console.log(name)
    try {
      const adm = await prismaClient.administrator.findFirst({ where: { name, email, username, password } })
      await prismaClient.administrator.delete({ where: { id: adm?.id } })
      res.status(204).send(adm)
    } catch (error) {
      res.status(404).send(error)
    }
  })
}
