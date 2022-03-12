export class UpdateBookError extends Error {
  constructor () {
    super('Update Falied')
    this.name = 'UpdateBookError'
  }
}
