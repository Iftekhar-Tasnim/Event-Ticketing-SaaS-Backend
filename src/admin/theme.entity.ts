
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('themes')
export class ThemeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('jsonb', { default: {} })
  properties: Record<string, any>; // Stores colors, fonts, custom CSS variables

  @Column({ default: false })
  isPremium: boolean;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column({ default: 'active' })
  status: string; // active, inactive, draft

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ type: 'jsonb', default: {} })
  defaultProperties: {
    colors: { primary: string; secondary: string; background: string; text: string };
    fonts: { heading: string; body: string };
    layout: string; // 'grid', 'list', 'hero-focus'
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
