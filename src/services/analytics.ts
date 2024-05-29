import { Sequelize, fn, literal } from 'sequelize';

import { Metrica } from '@app/models';
import { Insure } from '@app/models/insures.model';
import { Service } from '@app/models/service.model';
import { Transport } from '@app/models/transport.model';

export class InsureService {
  async findAll(): Promise<Insure[]> {
    return await Insure.findAll({
      attributes: [
        'transportId',
        [Sequelize.fn('COUNT', Sequelize.col('createdAt')), 'totalCreatedAt'], //кол-во дтп
        [Sequelize.fn('MAX', Sequelize.col('createdAt')), 'maxCreatedAt'],
      ],
      group: ['transportId'],
    });
  }
}

export class ServiceService {
  async findAll(): Promise<any[]> {
    return await Service.findAll({
      attributes: ['transport_id', 'createdAt', 'length'],
    });
  }
}

export class FuelService {
  async findAll(): Promise<any[]> {
    return await Transport.findAll({
      attributes: [
        'id', // transportId
        'avg_consumption',
        [
          fn(
            'SUM',
            literal(
              `ST_Distance(coords::geography, lag(coords::geography) over (partition by transport_id order by created_at)) / 1000`,
            ),
          ),
          'distance',
        ],
        [
          literal(`(
            SELECT (avg_consumption * (ST_Distance(coords::geography, lag(coords::geography) over (partition by transport_id order by created_at)) / 1000) / 100)
            FROM metrics
            WHERE metrics.transport_id = Transport.id
            GROUP BY transport_id
          )`),
          'totalFuelConsumption',
        ],
      ],
      include: [
        {
          model: Metrica,
          attributes: [],
        },
      ],
      group: ['Transport.id'],
    });
  }
}
