('use strict');
const { fakerRU: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let metrics = [];
    for (let i = 0; i < 10; i++) {
      metrics.push({
        transport_id: faker.number.int({ min: 1, max: 50 }),
        user_id: faker.number.int({ min: 1, max: 3 }),
        coords: JSON.stringify({
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('metrics', metrics);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('metrics', null, {});
  },
};
