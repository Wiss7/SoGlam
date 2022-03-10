export class Product {
  constructor(
    public name: string,
    public description: string,
    public section: string,
    public type: string,
    public size: number,
    public weight: number,
    public price: number,
    public discount: number,
    public discountPrice: number,
    public whatElseToKnow: string,
    public howToUse: string,
    public isOnSale: boolean,
    public isNewArrival: boolean,
    public isBestSeller: boolean,
    public images: { name: string; isDefault: boolean }[],
    public feedback: { review: string; stars: number }[],
    public formulation: string,
    public isSoldOut: boolean,
    public relatedProducts: string,
    public id: string
  ) {}
}
