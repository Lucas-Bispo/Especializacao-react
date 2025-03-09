export class Recipient {
    constructor(
      public id: string,
      public name: string,
      public address: string,
      public latitude: number,
      public longitude: number,
    ) {}
}