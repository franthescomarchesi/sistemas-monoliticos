import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
    tableName: "product_checkout",
    timestamps: false
})
export default class ProductCheckoutModel extends Model {
    
    @PrimaryKey
    @Column( {allowNull: false} )
    id: string

    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    orderId: string;

    @BelongsTo(() => require('./order.model').default)
    invoice: OrderModel;

    @Column( {allowNull: false} )
    name: string

    @Column( {allowNull: false} )
    description: string

    @Column( {allowNull: false} )
    salesPrice: number

}