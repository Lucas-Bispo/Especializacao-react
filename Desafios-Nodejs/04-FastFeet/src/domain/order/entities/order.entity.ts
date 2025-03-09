export class Order {
    constructor(
      public id: string,
      public recipientId: string,
      public deliverymanId: string | null,
      public status: 'awaiting' | 'picked_up' | 'delivered' | 'returned',
      public photoUrl: string | null,
      public createdAt: Date,
      public pickedUpAt: Date | null,
      public deliveredAt: Date | null,
      public returnedAt: Date | null,
    ) {}
  }