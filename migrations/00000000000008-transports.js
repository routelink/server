('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('transports', 'avgConsumption', {
      type: Sequelize.NUMBER,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('transports', 'avgConsumption', {
      type: Sequelize.STRING,
    });
  },
};
