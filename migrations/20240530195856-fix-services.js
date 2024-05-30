'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('services', 'services_transport_id_fkey');

    await queryInterface.addConstraint('services', {
      fields: ['transport_id'],
      type: 'foreign key',
      name: 'services_transport_id_fkey',
      references: {
        table: 'transports',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('services', 'services_transport_id_fkey');

    await queryInterface.addConstraint('services', {
      fields: ['transport_id'],
      type: 'foreign key',
      name: 'services_transport_id_fkey',
      references: {
        table: 'transports',
        field: 'id',
      },
    });
  },
};
