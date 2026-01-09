
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { ThemeEntity } from './theme.entity';

@Entity('tenant_configs')
export class TenantConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  // Enforce one config per tenant
  @OneToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Column({ nullable: true })
  themeId: string;

  @ManyToOne(() => ThemeEntity)
  @JoinColumn({ name: 'themeId' })
  theme: ThemeEntity;

  // JSONB columns for flexible configuration
  @Column({ type: 'jsonb', default: {} })
  styleOverrides: {
    colors?: { primary?: string; secondary?: string; background?: string; text?: string };
    fonts?: { heading?: string; body?: string };
  };

  @Column({ type: 'jsonb', default: {} })
  assets: {
    logoUrl?: string;
    heroBannerUrl?: string;
    faviconUrl?: string;
  };

  @Column({ type: 'jsonb', default: {} })
  siteInfo: {
    title?: string;
    description?: string;
    contactEmail?: string;
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
