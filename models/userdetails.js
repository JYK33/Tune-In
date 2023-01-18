const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

// create our User model 
class UserAttributes extends Model {}

UserAttributes.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
    }
)