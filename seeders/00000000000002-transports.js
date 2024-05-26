('use strict');
const { fakerRU: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let transports = [];
    for (let i = 0; i < 50; i++) {
      transports.push({
        name: `${faker.vehicle.manufacturer()}`,
        organization_id: faker.number.int({ min: 1, max: 50 }),
        type_id: faker.number.int({ min: 1, max: 3 }),
        avgConsumption: faker.number.int({ min: 1, max: 14 }),
        regNumber: faker.vehicle.vrm(),
        unit: 'L',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('transports', transports);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transports', null, {});
  },
};
