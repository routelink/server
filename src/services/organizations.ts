import { FindOptions } from 'sequelize';

import { Organization } from '@app/models';

export class OrgsService {
  async getCollection(options?: FindOptions): Promise<Organization[]> {
    return await Organization.findAll(options);
  }

  async getItem(id: string): Promise<Organization | null> {
    return await Organization.findOne({ where: { id: id } });
  }

  async create(data: any): Promise<[Organization, boolean]> {
    const { name } = data;
    const [org, created] = await Organization.findOrCreate({
      where: { name: name },
      defaults: { name: name, createdAt: new Date() },
    });
    return [org, created] as [Organization, boolean];
  }

  async update(id: string, data: any) {
    const { name } = data;
    const updated = await Organization.update({ name: name }, { where: { id: id } });
    return updated;
  }

  async remove(id: string): Promise<number> {
    return await Organization.destroy({ where: { id: id } });
  }
}
