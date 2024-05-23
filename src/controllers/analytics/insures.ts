import { Request, Response } from 'express';
import { fn, col } from 'sequelize';
import Insure from '../../models/insures.model';

export const getTransportWithUserCount = async (_req: Request, res: Response) => {
  try {
    const result = await Insure.findAll({
      where: { isUser: true },
      attributes: ['transportId', [fn('COUNT', col('id')), 'userCount']],
      group: ['transportId'],
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
