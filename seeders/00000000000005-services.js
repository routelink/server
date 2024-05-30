('use strict');
const { fakerRU: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let services = [];
    for (let i = 0; i < 50; i++) {
      services.push({
        length: faker.number.int({ min: 1, max: 50000 }),
        transport_id: faker.number.int({ min: 1, max: 50 }),
        description: faker.internet.userName(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('services', services);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
  },
};
