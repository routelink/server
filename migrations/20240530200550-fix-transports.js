'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'transports',
      'transports_organization_id_fkey',
    );

    await queryInterface.addConstraint('transports', {
      fields: ['organization_id'],
      type: 'foreign key',
      name: 'transports_organization_id_fkey',
      references: {
        table: 'organizations',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'transports',
      'transports_organization_id_fkey',
    );

    await queryInterface.addConstraint('transports', {
      fields: ['organization_id'],
      type: 'foreign key',
      name: 'transports_organization_id_fkey',
      references: {
        table: 'organizations',
        field: 'id',
      },
    });
  },
};
