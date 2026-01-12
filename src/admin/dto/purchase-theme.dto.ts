import { IsString, IsNotEmpty } from 'class-validator';

export class PurchaseThemeDto {
  @IsString()
  @IsNotEmpty()
  themeId: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string; // 'stripe', 'sslcommerz', 'bkash', 'nagad'
}

export class ThemePurchaseResponseDto {
  id: string;
  tenantId: string;
  themeId: string;
  themeName: string;
  pricePaid: number; // BDT
  status: string;
  purchasedAt: Date;
  expiresAt?: Date;
}
