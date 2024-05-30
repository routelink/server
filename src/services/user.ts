import { hash } from 'bcrypt';
import { FindOptions } from 'sequelize';
import { Json } from 'sequelize/types/utils';

import { Organization, Role, Transport, User } from '@app/models';


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

  async create(data: User): Promise<[User, boolean]> {
    const { email, password } = data;
    const hashedPassword = await hash(password, 10);
    data.set('password', hashedPassword);
    return await User.findOrCreate({
      where: { email: email },
      defaults: {
        ...data.get({ plain: true }),
        roleId: 3,
      },
      include: [Role, Organization],
    });
  }

  async update(id: number, data: User): Promise<User | null | Json> {
    const user: User | null = await this.getItemById(id);
    if (!user) {
      throw new Error('User not found');
    }
    data.set('id', id);
    await User.update(data.get({ plain: true }), { where: { id: id } });
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
