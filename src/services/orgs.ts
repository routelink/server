import { Org } from '@app/models';

import { FindOptions } from 'sequelize';

export class OrgsService {
  async getCollection(options?: FindOptions): Promise<Org[]> {
    return await Org.findAll(options);
  }

  async getItem(id: string): Promise<Org | null> {
    return await Org.findOne({ where: { id: id } });
  }

  async create(data: any): Promise<[Org, boolean]> {
    const { name } = data;
    const [org, created] = await Org.findOrCreate({
      where: { name: name },
      defaults: { name: name, createdAt: new Date() },
    });
    return [org, created] as [Org, boolean];
  }

  async update(id: string, data: any) {
    const { name } = data;
    const updated = await Org.update({ name: name }, { where: { id: id } });
    return updated;
  }

  async remove(id: string): Promise<number> {
    return await Org.destroy({ where: { id: id } });
  }
}
