import { Orgs } from '@app/models';

import { FindOptions } from 'sequelize';

export class OrgsService {
  async getCollection(options?: FindOptions): Promise<Orgs[]> {
    return await Orgs.findAll(options);
  }

  async getItem(id: string): Promise<Orgs | null> {
    return await Orgs.findOne({ where: { id: id } });
  }

  async create(data: any): Promise<[Orgs, boolean]> {
    const { name } = data;
    const [org, created] = await Orgs.findOrCreate({
      where: { name: name },
      defaults: { name: name, createdAt: new Date() },
    });
    return [org, created] as [Orgs, boolean];
  }

  async update(id: string, data: any) {
    const { name } = data;
    const updated = await Orgs.update({ name: name }, { where: { id: id } });
    return updated;
  }

  async remove(id: string): Promise<number> {
    return await Orgs.destroy({ where: { id: id } });
  }
}
