import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./invoice-items";

export default class Invoice extends BaseEntity implements AggregateRoot {

    private _name: string
    private _document: string
    private _address: Address
    private _items: InvoiceItems[]
    private _total: number

    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt)
        this._name = props.name
        this._document = props.document
        this._address = props.address
        this._items = props.items
        this.calculateTotal()
    }

    private calculateTotal(): void {
        this._total = this._items.reduce((accumulator, item) => accumulator + item.price, 0)
    }

    public get name(): string {
        return this._name;
    }

    public get document(): string {
        return this._document;
    }

    public get address(): Address {
        return this._address;
    }

    public get items(): InvoiceItems[] {
        return this._items;
    }

    public get total(): number {
        return this._total;
    }

}

type InvoiceProps = {
    id?: Id
    name: string
    document: string
    address: Address
    items: InvoiceItems[]
    createdAt?: Date
    updatedAt?: Date
}   