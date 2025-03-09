export class Notification {
  constructor(
    public id: string,
    public recipientId: string,
    public orderId: string,
    public message: string,
    public sentAt: Date,
  ) {}
}