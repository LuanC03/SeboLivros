export class AuthenticationAdmError extends Error {
  constructor () {
    super('Authentication failed')
    this.name = 'AuthenticationError'
  }
}
