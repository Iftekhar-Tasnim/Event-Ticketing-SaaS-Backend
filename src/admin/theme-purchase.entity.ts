import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { ThemeEntity } from './theme.entity';
import { PaymentEntity } from './payment.entity';

@Entity('theme_purchases')
export class ThemePurchaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Column()
  themeId: string;

  @ManyToOne(() => ThemeEntity)
  @JoinColumn({ name: 'themeId' })
  theme: ThemeEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: 'Price paid in BDT (Taka)' })
  pricePaid: number;

  @Column({ nullable: true })
  paymentId: string;

  @ManyToOne(() => PaymentEntity, { nullable: true })
  @JoinColumn({ name: 'paymentId' })
  payment: PaymentEntity;

  @Column({ default: 'active' })
  status: string; // active, expired, cancelled

  @Column({ nullable: true })
  expiresAt: Date; // For subscription-based themes (optional)

  @CreateDateColumn()
  purchasedAt: Date;
}
