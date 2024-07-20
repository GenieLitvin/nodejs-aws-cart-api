import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findOne({ where: { id: userId } });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const userCart = this.cartRepository.create({
      id: userId,
      items: [],
    });

    return this.cartRepository.save(userCart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let userCart = await this.findByUserId(userId);

    if (!userCart) {
      userCart = await this.createByUserId(userId);
    }

    return userCart;
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    let userCart = await this.findOrCreateByUserId(userId);
    userCart.items = items;
    return this.cartRepository.save(userCart);
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartRepository.delete(userId);
  }
}
