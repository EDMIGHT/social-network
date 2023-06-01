import jwt from 'jsonwebtoken';

const accessKey = process.env.accessKey ?? '';
const expiresIn = process.env.expiresIn ?? 86400;

export interface TokenPayload {
  id: string;
  login: string;
}

class TokenService {
  createAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, accessKey, {
      expiresIn,
    });
  }
}

export default new TokenService();
