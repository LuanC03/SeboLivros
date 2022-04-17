export class DeleteAdmError extends Error {
  constructor (message: string) {
    super(`Delete Falied: ${message}`)
    this.name = 'DeleteError'
  }
}
