import { User } from '@app/models';
import { hash } from 'bcrypt';
import { FindOptions } from 'sequelize';

export class UserService {
  async getCollection(options?: FindOptions): Promise<User[]> {
    return await User.findAll(options);
  }

  async getItem(options: FindOptions): Promise<User | null> {
    return await User.findOne({ where: { email: options } });
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

  async update(id: string, data: any) {
    const { name, email, password, phone } = data;
    const hashedPassword = await hash(password, 10);

    //const user = await User.findOne({ where: { id } });

    const updated = await User.update(
      {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
      },
      {
        where: { id: id },
      },
    );

    return updated;
  }

  async remove(id: string): Promise<number> {
    return await User.destroy({ where: { id: id } });
  }
}
