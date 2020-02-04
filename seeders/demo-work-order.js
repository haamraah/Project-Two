//'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Workorders', [{
            installationDate: '2019-09-10 06:35:39',
            clientName: 'Shi YU',
            clientPhone: '5856577',
            clientAddress: '123 North ave',
            jobAddress: '456 South ave',
            installerName: 'Raul',
            materials: 'carpet green',
            isComplete: 'Pending',
            comments: 'We are going to need more installers',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Workorders', null, {});
    }
};

// Run command to populate seed
//$ npx sequelize-cli db:seed:all
