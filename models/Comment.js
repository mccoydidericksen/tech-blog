const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    post_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        },
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comment;
