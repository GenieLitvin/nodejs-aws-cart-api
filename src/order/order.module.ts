import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { Order } from './models/order';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [ OrderService ],
  exports: [ OrderService ],
  controllers: [OrderController],
})
export class OrderModule {}
