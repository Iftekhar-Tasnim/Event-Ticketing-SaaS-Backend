import { IsString, IsBoolean, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ThemeCategory } from './create-theme.dto';

export class UpdateThemeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ThemeCategory)
  category?: ThemeCategory;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;

  @IsOptional()
  @IsNumber()
  price?: number; // Price in BDT

  @IsOptional()
  @IsString()
  status?: string; // active, inactive, draft

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  previewUrl?: string;

  @IsOptional()
  defaultProperties?: {
    colors?: { primary?: string; secondary?: string; background?: string; text?: string };
    fonts?: { heading?: string; body?: string };
    layout?: string;
  };

  @IsOptional()
  templateStructure?: any;

  @IsOptional()
  defaultContent?: any;
}
