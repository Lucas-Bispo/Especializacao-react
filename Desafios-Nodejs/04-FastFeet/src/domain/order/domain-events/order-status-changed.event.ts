export class OrderStatusChangedEvent {
    constructor(
      public readonly orderId: string,
      public readonly recipientId: string,
      public readonly newStatus: string,
    ) {
      console.log(`Notificação: Encomenda ${orderId} mudou para ${newStatus} para o destinatário ${recipientId}`);
    }
  }