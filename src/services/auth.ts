import { User, RefreshToken } from '@app/models';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '@app/models';

import { FindOptions } from 'sequelize';

export class AuthService {
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted);
  }

  async getRefreshToken(options: FindOptions): Promise<RefreshToken | null> {
    return await RefreshToken.findOne(options);
  }

  async generateTokens(
    user: User,
  ): Promise<{ token: string; refreshToken: RefreshToken }> {
    const token = jwt.sign({ email: user.email }, config.jwtSecret, {
      expiresIn: config.accessTokenExpiresIn,
    });

    const refreshToken = await new RefreshToken({
      token: crypto.randomBytes(64).toString('hex'),
      userId: user.id,
      valid: RefreshToken.generateExpiryDate(),
    }).save();

    return { token: token, refreshToken: refreshToken };
  }
}
