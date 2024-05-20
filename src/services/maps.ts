import { Metrics } from '@app/models';
import { FindOptions } from 'sequelize';

export class MapsService {
  async getCollection(options?: FindOptions): Promise<Metrics[]> {
    return await Metrics.findAll(options);
  }

  async getItemById(id: string): Promise<Metrics | null> {
    return await Metrics.findOne({ where: { id: id } });
  }

  async create(data: any) {
    const res = await Metrics.create(data);
    return res;
  }
  async update(id: string, data: any) {
    await Metrics.update({ ...data }, { where: { id: id } });
    const updated = await Metrics.findOne({ where: { id: id } });

    // console.log('updated', updated);

    return updated;
  }

  async delete(id: string): Promise<number> {
    return await Metrics.destroy({ where: { id: id } });
  }
}
