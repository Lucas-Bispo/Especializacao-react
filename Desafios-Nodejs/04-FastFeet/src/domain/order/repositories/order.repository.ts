import { Order } from '../entities/order.entity';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findAll(): Promise<Order[]>;
  abstract findByDeliverymanId(deliverymanId: string): Promise<Order[]>;
  abstract update(id: string, data: Partial<Order>): Promise<Order>;
  abstract delete(id: string): Promise<void>;
}