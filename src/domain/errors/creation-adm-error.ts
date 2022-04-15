export class CreationAdmError extends Error {
  constructor (message: string) {
    super(`Creation Falied: ${message}`)
    this.name = 'CreationError'
  }
}
