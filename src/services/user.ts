import { User } from '@app/models';
import { hash } from 'bcrypt';
import { FindOptions } from 'sequelize';
import { AuthService } from './auth';
import { Json } from 'sequelize/types/utils';

export class UserService {
  async getCollection(options?: FindOptions): Promise<User[]> {
    return await User.findAll(options);
  }

  async getItem(options: FindOptions): Promise<User | null> {
    return await User.findOne(options);
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
    return await User.destroy({ where: { id: id } });
  }
}
