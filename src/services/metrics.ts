import { FindOptions } from 'sequelize';

import { Metrica } from '@app/models';

export class MetricsService {
  async getCollection(options?: FindOptions): Promise<Metrica[]> {
    return await Metrica.findAll(options);
  }

  async getItem(options: any): Promise<Metrica | null> {
    return await Metrica.findOne(options);
  }

  async getItemById(id: string): Promise<Metrica | null> {
    return await Metrica.findOne({ where: { id: id } });
  }

  async create(data: any) {
    return await Metrica.create(data);
  }
  async update(id: string, data: any) {
    await Metrica.update({ ...data }, { where: { id: id } });
    return await Metrica.findOne({ where: { id: id } });
  }

  async delete(id: string): Promise<number> {
    return await Metrica.destroy({ where: { id: id } });
  }
}
