import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdminController } from './superadmin.controller';
import { SuperAdminService } from './superadmin.service';
import { UserEntity } from './user.entity';
import { TenantEntity } from './tenant.entity';
import { TenantUserEntity } from './tenant-user.entity';
import { WebhookEventEntity } from './webhook-event.entity';
import { PaymentEntity } from './payment.entity';
import { ActivityLogEntity } from './activity-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TenantEntity,
      TenantUserEntity,
      WebhookEventEntity,
      PaymentEntity,
      ActivityLogEntity,
    ]),
  ],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
})
export class SuperAdminModule {}
