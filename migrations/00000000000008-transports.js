('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE transports ALTER COLUMN "avgConsumption" TYPE INTEGER USING ("avgConsumption"::integer);'
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('transports', 'avgConsumption', {
      type: Sequelize.STRING,
    });
  },
};
