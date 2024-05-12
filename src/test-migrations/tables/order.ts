import { DataType } from "sequelize-typescript";

export const order = {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    clientId: {
      type: DataType.STRING(255),
      allowNull: false
    },
    status: {
        type: DataType.STRING(255),
        allowNull: false
    }
  }