import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,JoinColumn,
  } from 'typeorm';
  import { CartItem } from '../../cart/models/cart-item';
  import { Cart } from '../../cart/models/cart';
  
  @Entity({ name: 'orders' })
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'uuid' })
    user_id: string;
  
    @ManyToOne(() => Cart, { eager: true }) // `eager: true` загрузка данных о Cart
    @JoinColumn({ name: 'cart_id' }) // Указываем, что колонка в таблице orders называется cart_id
    cart: Cart;
  
    @Column({ type: 'jsonb' })
    items: Array<{
      productId: string;
      count: number;
    }>;
  
    @Column('jsonb')
    payment: {
      type: string;
      address?: any;
      creditCard?: any;
    };
  
    @Column('jsonb')
    delivery: {
      type: string;
      address: any;
    };
  
    @Column('text')
    comments: string;
  
    @Column({
      type: 'enum',
      enum: ['CREATED'],
      default: 'CREATED',
    })
    status: string;
  
    @Column('numeric')
    total: number;
  }
  