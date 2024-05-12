import { DataType } from "sequelize-typescript";

export const products = {
    id: {
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
    purchasePrice: {
      type: DataType.NUMBER,
      allowNull: true
    },
    stock: {
      type: DataType.NUMBER,
      allowNull: true
    },
    salesPrice: {
      type: DataType.NUMBER,
      allowNull: true
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: true
    }
  }