import { DataType } from "sequelize-typescript";

export const transactions = {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    orderId: {
      type: DataType.STRING(255),
      allowNull: false
    },
    amount: {
        type: DataType.NUMBER,
        allowNull: false
    },
    status: {
        type: DataType.STRING(255),
        allowNull: false
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false
    }
  }