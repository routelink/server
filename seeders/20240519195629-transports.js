'use strict';

const { hash } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('transports', [
      {
        id: 14,
        name: 'Ford',
        orgId: 4,
        typeId: 2,
        regNumber: 'О202УХ77',
        avgConsumption: 13,
        unit: 'L',
        createdAt: '2024-01-15T15:18:16.442Z',
        updatedAt: '2024-03-22T15:53:38.016Z',
      },
      {
        id: 15,
        name: 'Nissan',
        orgId: 5,
        typeId: 2,
        regNumber: 'О543ТА77',
        avgConsumption: 14.5,
        unit: 'L',
        createdAt: '2024-03-08T14:10:01.545Z',
        updatedAt: '2024-05-01T10:46:04.339Z',
      },
      {
        id: 16,
        name: 'Volkswagen',
        orgId: 1,
        typeId: 3,
        regNumber: 'Р790РТ77',
        avgConsumption: 10.8,
        unit: 'L',
        createdAt: '2024-02-09T02:36:17.180Z',
        updatedAt: '2024-02-13T09:15:22.972Z',
      },
      {
        id: 17,
        name: 'Kia',
        orgId: 2,
        typeId: 3,
        regNumber: 'С614АН77',
        avgConsumption: 7.9,
        unit: 'L',
        createdAt: '2024-01-24T07:39:19.335Z',
        updatedAt: '2024-03-12T06:47:56.000Z',
      },
      {
        id: 18,
        name: 'Nissan',
        orgId: 3,
        typeId: 1,
        regNumber: 'К087НМ77',
        avgConsumption: 5.2,
        unit: 'L',
        createdAt: '2024-05-02T10:21:46.181Z',
        updatedAt: '2024-05-17T16:51:32.423Z',
      },
      {
        id: 19,
        name: 'Mazda',
        orgId: 4,
        typeId: 2,
        regNumber: 'У341ЕН77',
        avgConsumption: 9.7,
        unit: 'L',
        createdAt: '2024-02-04T13:26:23.526Z',
        updatedAt: '2024-03-30T14:18:04.749Z',
      },
      {
        id: 20,
        name: 'Toyota',
        orgId: 5,
        typeId: 3,
        regNumber: 'Е149РХ77',
        avgConsumption: 9.8,
        unit: 'L',
        createdAt: '2024-01-11T06:14:41.900Z',
        updatedAt: '2024-05-13T20:12:22.796Z',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transports', null, {});
  },
};
