import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { UserRepository } from '../../user/repositories/user.repository';

@Injectable()
export class ListNearbyOrdersUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(deliverymanId: string, maxDistanceKm: number = 10): Promise<any[]> {
    const deliveryman = await this.userRepository.findById(deliverymanId);
    if (!deliveryman || !deliveryman.latitude || !deliveryman.longitude) {
      throw new Error('Deliveryman location not available');
    }

    const orders = await this.orderRepository.findByDeliveryman(deliverymanId);
    const recipients = await Promise.all(
      orders.map(order => this.userRepository.findById(order.recipientId)),
    );

    const nearbyOrders = orders.filter((order, index) => {
      const recipient = recipients[index];
      if (!recipient?.latitude || !recipient?.longitude) return false;

      const distance = this.calculateDistance(
        deliveryman.latitude,
        deliveryman.longitude,
        recipient.latitude,
        recipient.longitude,
      );
      return distance <= maxDistanceKm && order.status === 'awaiting';
    });

    return nearbyOrders;
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
  }
}