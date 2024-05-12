import { DataType } from "sequelize-typescript";

export const productCheckout = {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    orderId: {
        type: DataType.STRING(255),
        primaryKey: true,
        allowNull: false
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false
    },
    description: {
      type: DataType.STRING(255),
      allowNull: false
    },
    salesPrice: {
      type: DataType.NUMBER,
      allowNull: true
    }
  }