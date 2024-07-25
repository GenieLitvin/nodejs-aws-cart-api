import { Controller, Get } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { Order } from './models/order';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<any[]> {
    const orders:any = this.orderService.findAll();
    return orders
  }
}