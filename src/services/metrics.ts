import { Metrics } from '@app/models';
import { FindOptions } from 'sequelize';

export class MetricsService {
  async getCollection(options?: FindOptions): Promise<Metrics[]> {
    return await Metrics.findAll(options);
  }

  async getItem(options: any): Promise<Metrics | null> {
    return await Metrics.findOne(options);
  }

  async getItemById(id: string): Promise<Metrics | null> {
    return await Metrics.findOne({ where: { id: id } });
  }

  async create(data: any) {
    return await Metrics.create(data);
  }
  async update(id: string, data: any) {
    await Metrics.update({ ...data }, { where: { id: id } });
    return await Metrics.findOne({ where: { id: id } });
  }

  async delete(id: string): Promise<number> {
    return await Metrics.destroy({ where: { id: id } });
  }
}
