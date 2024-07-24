import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { CartItem } from '../../cart/models/cart-item';
  
  @Entity({ name: 'orders' })
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'uuid' })
    userId: string;
  
    @Column({ type: 'uuid' })
    cartId: string;
  
    @ManyToMany(() => CartItem)
    @JoinTable()
    items: CartItem[];
  
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
      enum: ['OPEN', 'ORDERED'],
      default: 'OPEN',
    })
    status: string;
  
    @Column('numeric')
    total: number;
  }
  