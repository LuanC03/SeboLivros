export interface TokenGenerator{
  generateToken: (params: TokenGenerator.Params) => Promise<TokenGenerator.ResultTokenGenerator>
}

export namespace TokenGenerator{
  export type Params = {
    token: string
    expirationInMs: number
  }
  export type ResultTokenGenerator = string
}
