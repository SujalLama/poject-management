# Project management api
This is a project management system made using technologies: node, sequelize and postgres.
#### Features
    1. Login and register into system
    2. CRUD project
    3. CRUD tasks related to the project

---
## To start this file
- npm install
- create config folder and db.js file inside
    
    -Paste this code

        `const Sequelize = require('sequelize');
        const sequelize = new Sequelize("db-name", "db-username", "db-password", {
        host: process.env.HOST,
        dialect: 'postgres'
        });
        const connectDB = async () => {
            try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
        }
        module.exports = {sequelize, connectDB};
        `
- npx sequelize-cli init
- npx sequelize-cli db:migrate (to run all migration file)
- npm start

---
####Thanks for using the app.
