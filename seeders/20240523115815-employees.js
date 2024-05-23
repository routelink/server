('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', [
        {
            fullname: 'Иванов И.И.',
            roleId: 2,
            transportId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fullname: 'Петров А.В.',
            roleId: 2,
            transportId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fullname: 'Сидоров К.А.',
            roleId: 3,
            transportId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fullname: 'Котов А.Б.',
            roleId: 2,
            transportId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fullname: 'Речкин Н.Н',
            roleId: 2,
            transportId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fullname: 'Степанов О.К.',
            roleId: 1,
            transportId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fullname: 'Краскин Л.Е.',
            roleId: 2,
            transportId: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
    },
    
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('employees');
    },
};