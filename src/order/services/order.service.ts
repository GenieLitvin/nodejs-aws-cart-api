import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { Order } from '../models/order';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    return order;
  }

  async  create(data: Partial<Order>): Promise<Order>  {
    const order = this.orderRepository.create({
      ...data,
        id: v4(),
      status: 'OPEN',
    });
    return this.orderRepository.save(order);
  }

  async update(orderId: string, data: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(orderId, data);
    const updatedOrder = await this.findById(orderId);
    if (!updatedOrder) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    return updatedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
