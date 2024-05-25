import { compare } from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { FindOptions } from 'sequelize';

import { RefreshToken, User } from '@app/models';
import { config } from '@app/models';

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
    const token = jwt.sign({ email: user.email, role: user.role_id }, config.jwtSecret, {
      expiresIn: config.accessTokenExpiresIn,
    });

    const refreshToken = await new RefreshToken({
      token: crypto.randomBytes(64).toString('hex'),
      userId: user.id,
      valid: RefreshToken.generateExpiryDate(),
    }).save();

    return { token: token, refreshToken: refreshToken };
  }

  async removeRefreshToken(options: FindOptions): Promise<number> {
    return await RefreshToken.destroy(options);
  }
}
