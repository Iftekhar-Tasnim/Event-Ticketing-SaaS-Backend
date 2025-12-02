import { Module } from '@nestjs/common';
import { TenantAdminController } from './tenant-admin.controller';
import { TenantAdminService } from './tenant-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Event,
  EventSession,
  TicketType,
  DiscountCode,
  Order,
  OrderItem,
  Ticket,
} from './tenant-entity';
import { UserEntity } from '../admin/user.entity';
import { TenantUserEntity } from '../admin/tenant-user.entity';
import { TenantEntity } from '../admin/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      EventSession,
      TicketType,
      DiscountCode,
      Order,
      OrderItem,
      Ticket,
      UserEntity,
      TenantUserEntity,
      TenantEntity,
    ]),
  ],
  controllers: [TenantAdminController],
  providers: [TenantAdminService],
  exports: [TenantAdminService],
})
export class TenantAdminModule {}
