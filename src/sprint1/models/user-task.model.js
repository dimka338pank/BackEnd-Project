import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConect.js";

export const UserTask = sequelize.define("UserTask", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "users_tasks",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["userId", "taskId"] 
    }
  ]
});