export class CreationAdmError extends Error {
  constructor () {
    super('Creation failed')
    this.name = 'CreationError'
  }
}
