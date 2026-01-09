import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ThemeEntity } from './theme.entity';

@Entity('tenants')
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'jsonb', name: 'branding_settings', nullable: true })
  brandingSettings: Record<string, any>;

  @Column({
    type: 'enum',
    enum: ['active', 'suspended', 'pending'],
    default: 'pending',
  })
  status: string;

  @Column({ nullable: true })
  themeId: string;

  @ManyToOne(() => ThemeEntity, { nullable: true })
  @JoinColumn({ name: 'themeId' })
  theme: ThemeEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
