export class Message {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public message: string,
    public isNew: Boolean,
    public date: any,
    public id?: string
  ) {}
}
