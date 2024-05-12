import { DataType } from "sequelize-typescript";

export const invoice = {
    id: {
        type: DataType.STRING(255),
        primaryKey: true,
        allowNull: false
      },
    name: {
        type: DataType.STRING(255),
        allowNull: false
    },
    document: {
        type: DataType.STRING(255),
        allowNull: false
    },
    street: {
        type: DataType.STRING(255),
        allowNull: false
    },
    number: {
        type: DataType.STRING(255),
        allowNull: false
    },
    complement: {
        type: DataType.STRING(255),
        allowNull: false
    },
    city: {
        type: DataType.STRING(255),
        allowNull: false
    },
    state: {
        type: DataType.STRING(255),
        allowNull: false
    },
    zipCode: {
        type: DataType.STRING(255),
        allowNull: false
    },
    total: {
        type: DataType.NUMBER,
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