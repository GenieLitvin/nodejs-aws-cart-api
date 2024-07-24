import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { Order } from './models/order';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
