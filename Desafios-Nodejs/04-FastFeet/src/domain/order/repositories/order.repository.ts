import { Order } from '../entities/order.entity';

export abstract class OrderRepository {
  abstract findById(id: string): Promise<Order | null>;
  abstract create(order: Order): Promise<void>;
  abstract findAll(): Promise<Order[]>;
  abstract update(id: string, data: Partial<Order>): Promise<Order>;
  abstract delete(id: string): Promise<void>;
}