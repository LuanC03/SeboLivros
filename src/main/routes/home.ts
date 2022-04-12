import { Request, Response, Router } from 'express'

export default (router: Router): void => {
  router.get('/api/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'server up novamente' })
  })
}
