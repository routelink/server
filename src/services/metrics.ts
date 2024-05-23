import { Metric } from '@app/models';
import { FindOptions } from 'sequelize';

export class MetricsService {
  async getCollection(options?: FindOptions): Promise<Metric[]> {
    return await Metric.findAll(options);
  }

  async getItem(options: any): Promise<Metric | null> {
    return await Metric.findOne(options);
  }

  async getItemById(id: string): Promise<Metric | null> {
    return await Metric.findOne({ where: { id: id } });
  }

  async create(data: any) {
    return await Metric.create(data);
  }
  async update(id: string, data: any) {
    await Metric.update({ ...data }, { where: { id: id } });
    return await Metric.findOne({ where: { id: id } });
  }

  async delete(id: string): Promise<number> {
    return await Metric.destroy({ where: { id: id } });
  }
}
