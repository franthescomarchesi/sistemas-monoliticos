import { DataType } from "sequelize-typescript";

export const invoiceItems = {
    id: {
        type: DataType.STRING(255),
        primaryKey: true,
        allowNull: false
    },
    invoiceId: {
        type: DataType.STRING(255),
        allowNull: false
    },
    name: {
        type: DataType.STRING(255),
        allowNull: false
    },
    price: {
        type: DataType.NUMBER,
        allowNull: false
    }
}