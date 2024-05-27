import { hash } from 'bcrypt';

import { Organization, Role, User } from '@app/models';

import { AuthService } from './auth';
import { cacheService } from './cache';

export class ProfileService {
  async getProfile(id: number): Promise<User | null> {
    const user = await cacheService.get('UserId-' + id);
    if (user) {
      return JSON.parse(user);
    }

    const profile = await User.findOne({
      where: { id: id },
      include: [Role, Organization],
      attributes: { exclude: ['password'] },
    });
    await cacheService.set('UserId-' + id, JSON.stringify(profile), 60);
    return profile;
  }

  async changeUsername(id: string | number, data: { username: string }) {
    const { username } = data;
    const user: User | null = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    await cacheService.del('UserId-' + id);
    await User.update({ username: username }, { where: { id: id } });
    return await User.findOne({
      where: { id: id },
      include: [Role, Organization],
      attributes: { exclude: ['password'] },
    });
  }

  async changePassword(
    id: string | number,
    data: { currentPassword: string; newPassword: string; confirmPassword: string },
  ) {
    const { currentPassword, newPassword, confirmPassword } = data;
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error('Invalid params');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Invalid confirm password');
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
    const updated = await User.update(
      { password: await hash(newPassword, 10) },
      { where: { id: id } },
    );
    return updated;
  }
}
