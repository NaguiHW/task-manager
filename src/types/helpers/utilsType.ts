export interface JwtPayload {
  exp: number;
}

export interface ErrorObject {
  msg: string;
  path: string;
}