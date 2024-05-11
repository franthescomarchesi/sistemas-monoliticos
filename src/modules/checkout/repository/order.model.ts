import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "./product.model";
import ClientModel from "./client.model";

@Table({
    tableName: "order",
    timestamps: false
})
export default class OrderModel extends Model {
    
    @PrimaryKey
    @Column( {allowNull: false} )
    id: string

    @ForeignKey(() => ClientModel)
    @Column( {allowNull: false} )
    clientId: string

    @BelongsTo(() => require('./client.model').default)
    client: ClientModel;

    @HasMany(() => require('./product.model').default)
    products: ProductModel[]

    @Column( {allowNull: false} )
    status: string

}