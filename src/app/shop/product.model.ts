export class Product {
  constructor(
    public name: string,
    public description: string,
    public type: string,
    public size: string,
    public price: number,
    public discount: number,
    public discountPrice: number,
    public ingredients: string,
    public howToUse: string,
    public isOnSale: Boolean,
    public isNewArrival: Boolean,
    public isBestSeller: Boolean,
    public images: { name: string; isDefault: boolean }[],
    public feedback: { review: string; stars: number }[],
    public id: string
  ) {}
}
