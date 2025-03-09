import { Order } from '../entities/order.entity';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findAll(): Promise<Order[]>;
  abstract findByDeliveryman(deliverymanId: string): Promise<Order[]>;
  abstract findByRecipient(recipientId: string): Promise<Order[]>;
  abstract update(id: string, data: Partial<Order>): Promise<Order>;
}