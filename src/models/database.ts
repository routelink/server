import { Sequelize } from 'sequelize-typescript';

import { config } from '@app/models';

export const sequelize = new Sequelize(config.dbUri, {
  dialect: 'postgres',
  models: [
    process.env.NODE_ENV === 'test'
      ? `${__dirname}/models/*.model.{js,ts}`
      : `${__dirname}/../models/*.model.ts`,
  ],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.model')).replace('-', '').toLowerCase() ===
      member.toLowerCase()
    );
  },
});
