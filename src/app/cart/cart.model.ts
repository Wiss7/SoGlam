export class CartItem {
  constructor(
    public quantity: number,
    public userID: string,
    public productID: string,
    public id?: number
  ) {}
}
