export type AdmParams = {
  name: string
  email: string
  username: string
  password: string
}
export namespace AdmUpdateResult {
  export type Params = {
    password: string
    email: string
    name: string
  }
}
export class AdmAccount {
  name: string
  email: string
  password: string
  username: string

  constructor (params: AdmParams) {
    this.name = params.name
    this.email = params.email
    this.password = params.password
    this.username = params.username
  }

  updateAdmAccount (model: {name?: string, email?: string, password?: string}): AdmUpdateResult.Params {
    if (model.name !== undefined) this.name = model.name
    if (model.email !== undefined) this.email = model.email
    if (model.password !== undefined) this.password = model.password
    return {
      password: this.password,
      email: this.email,
      name: this.name
    }
  }
}
