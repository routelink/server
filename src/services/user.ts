import { hash } from 'bcrypt';
import { FindOptions } from 'sequelize';
import { Json } from 'sequelize/types/utils';

import { Organization, Role, Transport, User } from '@app/models';

import { AuthService } from './auth';

export class UserService {
  async getCollection(options?: FindOptions): Promise<User[]> {
    return await User.findAll({
      ...options,
      include: [Role, Organization, Transport],
    });
  }

  async getItem(options: FindOptions): Promise<User | null> {
    return await User.findOne({
      ...options,
      include: [Role, Organization],
    });
  }

  async getItemById(id: number): Promise<User | null> {
    return await User.findOne({
      where: { id: id },
      include: [Role, Organization],
    });
  }

  async create(data: User): Promise<User> {
    const { email, password } = data;
    const hashedPassword = await hash(password, 10);
    data.set('password', hashedPassword);
    const [user, _created] = await User.findOrCreate({
      where: { email: email },
      defaults: data.get({ plain: true }),
      include: [Role, Organization],
    });
    return user;
  }

  async update(id: number, options: any): Promise<User | null | Json> {
    const { password, currentPassword } = options;
    const user: User | null = await this.getItemById(id);
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
    return await this.getItemById(id);
  }

  async remove(id: number): Promise<number> {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return await User.destroy({ where: { id: id } });
  }
}
