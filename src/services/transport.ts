import { Transport } from '@app/models';
import { GetTransportsPayload, ITransport } from '@app/types';

export class TransportService {
  async getItems(options: GetTransportsPayload): Promise<Transport[]> {
    const limit = options.count || 10;
    const page = options.page || 1;
    const offset = (page - 1) * limit;
    const order = [];
    if (options.sortBy) {
      const sortOrder =
        options.sortOrder && options.sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      order.push([options.sortBy, sortOrder]);
    }

    const items = await Transport.findAll({
      limit,
      offset,
      // @ts-ignore
      order, // Добавляем порядок сортировки в запрос
    });

    return items;
  }

  async addTransport(payload: ITransport) {
    // @ts-ignore
    await Transport.create(payload);
  }
}
