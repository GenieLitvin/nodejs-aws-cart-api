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
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findOne({ where: { id: userId } });
  }
  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
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
    console.log('userCart', userCart)
    if (!userCart) {
      userCart = await this.createByUserId(userId);
      console.log('userCart2', userCart)
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
