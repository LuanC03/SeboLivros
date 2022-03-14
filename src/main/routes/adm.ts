
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/adm', (req, res) => {
    res.send({ response: 'saida' })
  })
}
