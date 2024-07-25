import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus, ConsoleLogger } from '@nestjs/common';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Ensure correct path
import { BasicAuthGuard } from '../auth/guards'; // Ensure correct path
import { CartStatuses } from './models/cart-statuses';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    console.log('here', req.user)
    const id = getUserIdFromRequest(req)
    console.log('id',id)
    const cart = await this.cartService.findOrCreateByUserId(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: calculateCartTotal(cart) },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) { // TODO: validate body payload...

    const cart = await this.cartService.updateByUserId(getUserIdFromRequest(req), body);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart),
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const { id: cartId, items } = cart;
    const total = calculateCartTotal(cart);

    console.log('ORDER', { 
      ...body, 
      user_id: userId,
      cart: cartId,
      items,
      total,
    })


    const order = await this.orderService.create({
      ...body, 
      user_id: userId,
      cart: cartId,
      items,
      total,
    });

  //console.log('ORDER SAVED ', order)
    // TODO
  //await this.cartService.removeByUserId(userId);
  await this.cartService.updateByUserId(userId, cart, CartStatuses.ORDERED)
  return {
    statusCode: HttpStatus.OK,
    message: 'OK',
    data: { order },
  };
  }
}
