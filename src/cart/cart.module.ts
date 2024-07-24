import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './models/cart';
import { CartItem } from './models/cart-item';
import { OrderService } from 'src/order';
@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    OrderModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
