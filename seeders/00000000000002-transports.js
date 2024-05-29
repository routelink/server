('use strict');
const { fakerRU: faker } = require('@faker-js/faker');
function generateRegNumber() {
  const letters = 'АВЕКМНОРСТУХ';
  const randomLetters = () => letters[Math.floor(Math.random() * letters.length)];
  const randomDigits = () => Math.floor(Math.random() * 10);

  return `${randomLetters()}${randomDigits()}${randomDigits()}${randomDigits()}${randomLetters()}${randomLetters()}77`;
}
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
        regNumber: generateRegNumber(),
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
