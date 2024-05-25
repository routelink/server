('use strict');
const { fakerRU: faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let organizations = [];
    for (let i = 0; i < 50; i++) {
      organizations.push({
        name: `${faker.company.name()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('organizations', organizations);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('organizations', null, {});
  },
};
