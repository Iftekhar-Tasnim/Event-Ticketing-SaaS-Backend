
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

  @Column({ default: 'general', nullable: true })
  category: string; // 'music', 'jobfair', 'expo', 'conference', 'sports', 'festival', 'general'

  @Column('jsonb', { default: {} })
  properties: Record<string, any>; // Stores colors, fonts, custom CSS variables

  @Column({ default: false })
  isPremium: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Price in BDT (Taka)' })
  price: number;

  @Column({ default: 'active' })
  status: string; // active, inactive, draft

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ type: 'text', nullable: true })
  previewUrl: string; // Live demo URL

  @Column({ type: 'jsonb', default: {} })
  defaultProperties: {
    colors: { primary: string; secondary: string; background: string; text: string };
    fonts: { heading: string; body: string };
    layout: string; // 'grid', 'list', 'hero-focus'
  };

  @Column({ type: 'jsonb', default: {} })
  templateStructure: {
    sections: {
      hero: { enabled: boolean; order: number };
      about: { enabled: boolean; order: number };
      features: { enabled: boolean; order: number };
      schedule: { enabled: boolean; order: number };
      tickets: { enabled: boolean; order: number };
      speakers: { enabled: boolean; order: number };
      venue: { enabled: boolean; order: number };
      gallery: { enabled: boolean; order: number };
      faq: { enabled: boolean; order: number };
    };
    components: {
      cardStyle: string;
      buttonStyle: string;
      sectionSpacing: string;
    };
  };

  @Column({ type: 'jsonb', default: {} })
  defaultContent: {
    hero: { title: string; subtitle: string; ctaText: string };
    about: { heading: string; content: string };
    features: Array<{ icon: string; title: string; description: string }>;
    schedule: Array<{ time: string; title: string; description: string }>;
    tickets: Array<{ name: string; description: string; features: string[] }>;
    speakers: Array<{ name: string; role: string; bio: string }>;
    venue: { name: string; address: string; directions: string };
    faq: Array<{ question: string; answer: string }>;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
