export interface LoadAuthenticationAdmApi {
  loadAdm: (params: LoadAuthenticationAdmApi.Params) => Promise<LoadAuthenticationAdmApi.Result>
}

export namespace LoadAuthenticationAdmApi {
  export type Params = {
    user: string
    password: string
  }

  export type Result = undefined
}
