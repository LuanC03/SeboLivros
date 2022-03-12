export class AccessToken {
  constructor (private readonly token: string) {
  }

  static get expirationInMs (): number {
    return 30 * 60 * 1000
  }
}
