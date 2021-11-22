import { Address } from '../account/address/address.model';
import { CartItem } from '../cart/cart.model';

export class Order {
  constructor(
    public address: Address,
    public userID: string,
    public status: string,
    public date: any,
    public paymentMethod: string,
    public shippingFee: number,
    public subTotal: number,
    public currencyPaid: string,
    public discount: number,
    public grandTotal: number,
    public items: CartItem[],
    public email: string,
    public isNew: boolean,
    public id?: string
  ) {}
}
