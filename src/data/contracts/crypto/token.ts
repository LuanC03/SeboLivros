export interface TokenGenerator{
  generateToken: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}

export namespace TokenGenerator{
  export type Params = {
    token: string
  }
  export type Result = {
    token: string
  }
}
