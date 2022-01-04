export class Review {
  constructor(
    public user: any,
    public reviewDate: any,
    public stars: number,
    public description: string,
    public id?: string
  ) {}
}
