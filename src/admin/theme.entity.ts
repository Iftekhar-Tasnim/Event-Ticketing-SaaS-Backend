
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

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number; // 0 if free

  @Column({ default: 'active' })
  status: string; // active, inactive, draft

  @Column({ nullable: true })
  thumbnailUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
