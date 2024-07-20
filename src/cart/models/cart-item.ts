import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart';

@Entity('cart_items') // Specify the custom table name
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable:true })
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
  };

  @Column('int')
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
