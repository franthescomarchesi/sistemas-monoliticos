import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Client from "./client.entity"
import Product from "./product.entity"


export default class Order extends BaseEntity {

    private _client: Client
    private _products: Product[]
    private _status: string

    constructor(props: OrderProps) {
        super(props.id)
        this._client = props.client
        this._products = props.products
        this._status = props.status || "pending"
    }

    approved(): void {
        this._status = "approved"
    }

    public get client(): Client {
        return this._client;
    }

    public get products(): Product[] {
        return this._products;
    }

    public get status(): string {
        return this._status;
    }

    get total(): number {
        return this._products.reduce((total, product) => total + product.salesPrice, 0)
    }

}

type OrderProps = {
    id?: Id
    client: Client
    products: Product[]
    status?: string
}