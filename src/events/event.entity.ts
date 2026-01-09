
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TenantEntity } from '../admin/tenant.entity';
import { ThemeEntity } from '../admin/theme.entity';

@Entity('events_v2')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  tenantId: string;

  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  startAt: Date;

  @Column({ nullable: true })
  endAt: Date;

  @Column()
  venue: string;

  @Column()
  city: string;

  @Column({ default: 'Bangladesh' })
  country: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: 'draft' }) // draft, published, cancelled
  status: string;

  @Column({ type: 'int', default: 100 })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  soldCount: number;

  // Theme Integration
  @Column({ nullable: true })
  themeId: string;

  @ManyToOne(() => ThemeEntity, { nullable: true })
  @JoinColumn({ name: 'themeId' })
  theme: ThemeEntity;

  // Single-Event Landing Page Fields
  @Column({ type: 'jsonb', nullable: true, default: '[]' })
  bannerImages: string[]; // Array of banner image URLs

  @Column({ type: 'jsonb', nullable: true, default: '[]' })
  gallery: string[]; // Gallery image URLs

  @Column({ type: 'text', nullable: true })
  fullDescription: string; // Rich text description

  @Column({ type: 'jsonb', nullable: true, default: '[]' })
  schedule: { time: string; activity: string; description?: string }[];

  @Column({ type: 'jsonb', nullable: true, default: '[]' })
  faq: { question: string; answer: string }[];

  @Column({ type: 'jsonb', nullable: true, default: '{}' })
  themeCustomization: {
    primaryColor?: string;
    secondaryColor?: string;
    logo?: string;
    customCss?: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
