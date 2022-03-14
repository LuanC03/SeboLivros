export class UpdateBookError extends Error {
  constructor (message: string) {
    super(`Update Falied: ${message}`)
    this.name = 'UpdateBookError'
  }
}
