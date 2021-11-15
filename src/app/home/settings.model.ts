export class Settings {
  constructor(
    public shippingRateCurrency: number,
    public lebanonShippingFee: number,
    public currencyRate: number,
    public discountPct: number,
    public discountFirstOrder: number,
    public images: string,
    public id?: string
  ) {}
}
