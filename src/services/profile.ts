import { hash } from 'bcrypt';

import { Organization, Role, User } from '@app/models';

import { AuthService } from './auth';
import { cacheService } from './cache';

export class ProfileService {
  async getProfile(id: number): Promise<User | null> {
    const redisResponse = await cacheService.get('UserId-' + id);
    if (redisResponse) {
      //console.log('!!RADIS!!' + redisResponse);
      return JSON.parse(redisResponse);
    } else {
      const dbResponse = await User.findOne({
        where: { id: id },
        include: [Role, Organization],
        attributes: { exclude: ['password'] },
      });
      if (dbResponse) {
        //console.log('!!DB!!' + JSON.stringify(dbResponse));
        await cacheService.set('UserId-' + id, JSON.stringify(dbResponse), 600);
      }
      return dbResponse;
    }
  }

  async changeUserName(id: string | number, data: any) {
    const { userName } = data;
    const user: User | null = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    //console.log('!!RADIS!!' + ' delete UserId-' + id);
    await cacheService.del('UserId-' + id);
    const updated = await User.update({ username: userName }, { where: { id: id } });
    return updated;
  }

  async changePassword(id: string | number, data: any) {
    const { currentPassword, newPassword, confirmPassword } = data;
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error('Invalid params');
    }
    const user: User | null = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    if (currentPassword && newPassword) {
      const authService = new AuthService();
      if (!(await authService.compare(currentPassword, user.password))) {
        throw new Error('Invalid current password');
      }
    }
    if (newPassword !== confirmPassword) {
      throw new Error('Invalid confirm password');
    }
    const updated = await User.update(
      { password: await hash(newPassword, 10) },
      { where: { id: id } },
    );
    return updated;
  }
}
