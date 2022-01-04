export class Product {
  constructor(
    public name: string,
    public description: string,
    public type: string,
    public size: number,
    public weight: number,
    public price: number,
    public discount: number,
    public discountPrice: number,
    public ingredients: string,
    public howToUse: string,
    public isOnSale: boolean,
    public isNewArrival: boolean,
    public isBestSeller: boolean,
    public images: { name: string; isDefault: boolean }[],
    public feedback: { review: string; stars: number }[],
    public formulation: string,
    public ingredientCallouts: string,
    public isSoldOut: boolean,
    public id: string
  ) {}
}
