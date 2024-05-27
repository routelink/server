import { hash } from 'bcrypt';
import { FindOptions } from 'sequelize';
import { Json } from 'sequelize/types/utils';

import { Organization, Role, User } from '@app/models';

import { AuthService } from './auth';

export class UserService {
  async getCollection(options?: FindOptions): Promise<User[]> {
    return await User.findAll({
      ...options,
      include: [Role, Organization],
    });
  }

  async getItem(options: FindOptions): Promise<User | null> {
    return await User.findOne(options);
  }

  async getItemById(id: number): Promise<User | null> {
    return await User.findOne({ where: { id: id } });
  }

  async create(data: any): Promise<[User, boolean]> {
    const { email, password } = data;
    const hashedPassword = await hash(password, 10);
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: { ...data, email, password: hashedPassword },
    });
    return [user, created] as [User, boolean];
  }

  async update(id: string | number, options: any): Promise<User | null | Json> {
    const { password, currentPassword } = options;
    const user: User | null = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    if (password && currentPassword) {
      const authService = new AuthService();
      if (await authService.compare(currentPassword, user.password)) {
        options.password = await hash(password, 10);
      } else {
        throw new Error('Invalid current password');
      }
    }
    await User.update({ ...options }, { where: { id: id } });
    return await User.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<number> {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return await User.destroy({ where: { id: id } });
  }
}
