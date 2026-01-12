import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ThemePurchaseService } from './theme-purchase.service';
import { PurchaseThemeDto } from './dto/purchase-theme.dto';
import { ThemeQueryDto } from './admin.dto';

@Controller('tenant-admin/themes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TenantAdmin')
export class ThemePurchaseController {
  constructor(private readonly themePurchaseService: ThemePurchaseService) {}

  @Get('available')
  async getAvailableThemes(@Request() req) {
    const tenantId = req.user.tenantId;
    return this.themePurchaseService.getAvailableThemesForTenant(tenantId);
  }

  @Post(':id/purchase')
  async purchaseTheme(
    @Request() req,
    @Param('id') themeId: string,
    @Body() purchaseDto: PurchaseThemeDto,
  ) {
    const tenantId = req.user.tenantId;
    // Set themeId from param if not in body
    purchaseDto.themeId = themeId;
    return this.themePurchaseService.purchaseTheme(tenantId, purchaseDto);
  }

  @Get('purchased')
  async getPurchasedThemes(@Request() req) {
    const tenantId = req.user.tenantId;
    return this.themePurchaseService.getTenantPurchasedThemes(tenantId);
  }

  @Get('check-access/:id')
  async checkAccess(@Request() req, @Param('id') themeId: string) {
    const tenantId = req.user.tenantId;
    const hasAccess = await this.themePurchaseService.checkThemeAccess(tenantId, themeId);
    return { hasAccess };
  }
}
