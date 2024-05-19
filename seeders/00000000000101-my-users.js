const { hash } = require('bcrypt');

('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('my_users', [
      {
        name: 'admin',
        email: 'admin@routelink.ru',
        username: 'admin',
        password: await hash('admin', 10),
        createdAt: new Date(),
      },
      {
        name: 'test',
        email: 'test@routelink.ru',
        username: 'Testing User',
        password: await hash('test', 10),
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('my_users', null, {});
  },
};
