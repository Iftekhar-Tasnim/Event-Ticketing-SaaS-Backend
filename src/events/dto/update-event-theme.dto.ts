import { IsString, IsBoolean, IsOptional, IsNumber, IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class HeroContent {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  backgroundImage: string;

  @IsString()
  ctaText: string;

  @IsString()
  ctaLink: string;
}

class AboutContent {
  @IsString()
  heading: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}

class FeatureContent {
  @IsString()
  icon: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

class ScheduleContent {
  @IsString()
  time: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  speaker?: string;
}

class TicketContent {
  @IsString()
  name: string;

  @IsNumber()
  price: number; // BDT

  @IsString()
  description: string;

  @IsNumber()
  available: number;

  @IsArray()
  @IsString({ each: true })
  features: string[];
}

class SpeakerContent {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  bio: string;

  @IsString()
  photo: string;

  @IsOptional()
  @IsObject()
  social?: { twitter?: string; linkedin?: string };
}

class VenueContent {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  mapUrl: string;

  @IsString()
  directions: string;

  @IsString()
  parking: string;
}

class FaqContent {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}

export class UpdateEventThemeContentDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => HeroContent)
  hero?: HeroContent;

  @IsOptional()
  @ValidateNested()
  @Type(() => AboutContent)
  about?: AboutContent;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureContent)
  features?: FeatureContent[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleContent)
  schedule?: ScheduleContent[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketContent)
  tickets?: TicketContent[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpeakerContent)
  speakers?: SpeakerContent[];

  @IsOptional()
  @ValidateNested()
  @Type(() => VenueContent)
  venue?: VenueContent;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqContent)
  faq?: FaqContent[];
}

export class UpdateEventSeoDto {
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  ogImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}

export class PublishEventDto {
  @IsBoolean()
  isPublished: boolean;
}
