import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { TicketEntity } from '../tickets/ticket.entity';
import { EventEntity } from '../events/event.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column()
  ticketId: string;

  @ManyToOne(() => TicketEntity)
  @JoinColumn({ name: 'ticketId' })
  ticket: TicketEntity;

  @Column()
  eventId: string;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerTicket: number; // Price at time of purchase

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number; // quantity * pricePerTicket

  @Column({ nullable: true })
  qrCode: string; // QR code for ticket validation

  @Column({ default: 'valid' }) // valid, used, cancelled
  ticketStatus: string;

  @CreateDateColumn()
  createdAt: Date;
}
