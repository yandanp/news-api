// models/user.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
    // Method untuk memverifikasi password
    static async verifyPassword(inputPassword, hashedPassword) {
      return await bcrypt.compare(inputPassword, hashedPassword);
    }
  }

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

module.exports = User;
