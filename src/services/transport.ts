import { Order } from 'sequelize';

import { Transport, Type } from '@app/models';
import { GetTransportsPayload, ITransport } from '@app/types';

export class TransportService {
  async getItems(options: GetTransportsPayload): Promise<Transport[]> {
    const limit = options.count || 10;
    const page = options.page || 1;
    const offset = (page - 1) * limit;
    const order: Order = [];
    if (options.sortBy) {
      const sortOrder =
        options.sortOrder && options.sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      order.push([options.sortBy, sortOrder]);
    }

    const items = await Transport.findAll({
      limit,
      offset,
      order,
    });

    return items;
  }

  async getTypes(): Promise<Type[]> {
    return await Type.findAll();
  }

  async addItem(data: any): Promise<Transport> {
    const { id } = data;
    console.log(data);
    const [item, _created] = await Transport.findOrCreate({
      where: { id: id },
      defaults: data.get({ plain: true }),
    });
    return item;
  }
  async editItem(data: any, id: number) {
    
    await Transport.update(data.get({ plain: true }), { where: { id: id } });

    return await Transport.findOne({ where: { id: id } });
  }

  async deleteItem(id: ITransport['id']): Promise<number> {
    return await Transport.destroy({ where: { id: id } });
  }
}
