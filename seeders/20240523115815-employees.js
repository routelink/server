('use strict');
const { fakerRU: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let employees = [];
    for (let i = 0; i < 50; i++) {
      employees.push({
        fullname: `${faker.person.fullName()}`,
        roleId: faker.number.int({ min: 1, max: 3 }),
        transportId: faker.number.int({ min: 1, max: 3 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('employees', employees);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  },
};
