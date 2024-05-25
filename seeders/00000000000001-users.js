const { hash } = require('bcrypt');

('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        username: 'admin',
        role_id: 1,
        organization_id: 1,
        email: 'admin@routelink.ru',
        password: await hash('admin', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'driver',
        username: 'driver',
        role_id: 2,
        organization_id: 2,
        email: 'admin@routelink.ru',
        password: await hash('admin', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'analytic',
        username: 'analytic',
        role_id: 3,
        organization_id: 3,
        email: 'admin@routelink.ru',
        password: await hash('admin', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
