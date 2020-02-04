//'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Warehouses', [{
            materialName: 'Carpet',
            materialSize: '500 ft',
            materialQuantity: '123',
            materialPrice: '24',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Warehouses', null, {});
    }
};

// Run command to populate seed
//$ npx sequelize-cli db:seed:all
