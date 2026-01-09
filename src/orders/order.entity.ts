import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from '../customers/customer.entity';
import { TenantEntity } from '../admin/tenant.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column()
  tenantId: string;

  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Column({ unique: true })
  orderNumber: string; // e.g., "ORD-2026-001234"

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'pending' }) // pending, paid, cancelled, refunded
  status: string;

  @Column({ nullable: true }) // stripe, bkash, nagad, cash
  paymentMethod: string;

  @Column({ nullable: true })
  paymentReference: string; // Payment gateway transaction ID

  @Column({ type: 'jsonb', nullable: true })
  billingInfo: {
    email: string;
    phone: string;
    name: string;
  };

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @Column({ nullable: true })
  paidAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
