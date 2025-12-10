import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConect.js";
// import { title } from "process";

export const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
    tableName: 'tasks',
    timestamps: true
});
