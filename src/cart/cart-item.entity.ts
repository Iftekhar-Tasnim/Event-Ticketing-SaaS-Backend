import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from '../customers/customer.entity';
import { TicketEntity } from '../tickets/ticket.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  customerId: string; // Null for guest carts

  @ManyToOne(() => CustomerEntity, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column({ nullable: true })
  sessionId: string; // For guest users

  @Column()
  ticketId: string;

  @ManyToOne(() => TicketEntity)
  @JoinColumn({ name: 'ticketId' })
  ticket: TicketEntity;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
