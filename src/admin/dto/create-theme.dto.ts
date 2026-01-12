import { IsString, IsBoolean, IsOptional, IsNumber, IsObject, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum ThemeCategory {
  MUSIC = 'music',
  JOBFAIR = 'jobfair',
  EXPO = 'expo',
  CONFERENCE = 'conference',
  SPORTS = 'sports',
  FESTIVAL = 'festival',
  GENERAL = 'general',
}

class ColorScheme {
  @IsString()
  primary: string;

  @IsString()
  secondary: string;

  @IsString()
  background: string;

  @IsString()
  text: string;
}

class FontScheme {
  @IsString()
  heading: string;

  @IsString()
  body: string;
}

class DefaultProperties {
  @ValidateNested()
  @Type(() => ColorScheme)
  colors: ColorScheme;

  @ValidateNested()
  @Type(() => FontScheme)
  fonts: FontScheme;

  @IsString()
  layout: string;
}

class SectionConfig {
  @IsBoolean()
  enabled: boolean;

  @IsNumber()
  order: number;
}

class ComponentConfig {
  @IsString()
  cardStyle: string;

  @IsString()
  buttonStyle: string;

  @IsString()
  sectionSpacing: string;
}

class TemplateStructure {
  @IsObject()
  sections: {
    hero: SectionConfig;
    about: SectionConfig;
    features: SectionConfig;
    schedule: SectionConfig;
    tickets: SectionConfig;
    speakers: SectionConfig;
    venue: SectionConfig;
    gallery: SectionConfig;
    faq: SectionConfig;
  };

  @ValidateNested()
  @Type(() => ComponentConfig)
  components: ComponentConfig;
}

class FeatureItem {
  @IsString()
  icon: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

class ScheduleItem {
  @IsString()
  time: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

class TicketItem {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  features: string[];
}

class SpeakerItem {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  bio: string;
}

class VenueInfo {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  directions: string;
}

class FaqItem {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}

class DefaultContent {
  @IsObject()
  hero: { title: string; subtitle: string; ctaText: string };

  @IsObject()
  about: { heading: string; content: string };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureItem)
  features: FeatureItem[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleItem)
  schedule: ScheduleItem[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketItem)
  tickets: TicketItem[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpeakerItem)
  speakers: SpeakerItem[];

  @ValidateNested()
  @Type(() => VenueInfo)
  venue: VenueInfo;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqItem)
  faq: FaqItem[];
}

export class CreateThemeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ThemeCategory)
  category: ThemeCategory;

  @IsBoolean()
  isPremium: boolean;

  @IsOptional()
  @IsNumber()
  price?: number; // Price in BDT

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  previewUrl?: string;

  @ValidateNested()
  @Type(() => DefaultProperties)
  defaultProperties: DefaultProperties;

  @IsOptional()
  @ValidateNested()
  @Type(() => TemplateStructure)
  templateStructure?: TemplateStructure;

  @IsOptional()
  @ValidateNested()
  @Type(() => DefaultContent)
  defaultContent?: DefaultContent;
}
