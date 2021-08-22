export class Settings {
  constructor(
    public currencyRate: number,
    public discountPct: number,
    public discountFirstOrder: number,
    public id?: string
  ) {}
}
