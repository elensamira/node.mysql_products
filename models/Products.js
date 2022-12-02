const Sequelize = require('sequelize');
const db = require('./db');

const Products = db.define('productss',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Products.sync();

module.exports = Products;