//'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            username: 'Admin',
            email: 'admin@admin',
            password: '$2b$10$PKJxyLHdZjuq45Fmf1raieJOS0/3OANJQUqNP9Z9K05M8QD3u83B6',
            isAdmin: true, 
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};

// Run command to populate seed
//$ npx sequelize-cli db:seed:all
