import { Module } from '@nestjs/common';
import { TenantAdminController } from './tenant-admin.controller';
import { TenantAdminService } from './tenant-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, EventSession, TicketType, DiscountCode, Order, Ticket } from './tenant-entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports     : [
    MailerModule.forRoot({
      transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
      user: 'yeasirahnaf099@gmail.com',
      pass: 'pthqdbgqyipifjsc'
      }
        }, defaults:{
            from: 'yeasirahnaf099@gmail.com',
          }
        }),
    TypeOrmModule.forFeature([Event, EventSession, TicketType, DiscountCode, Order, Ticket])
  ],
  controllers : [TenantAdminController],
  providers   : [TenantAdminService],
  exports     : [TenantAdminService],
})
export class TenantAdminModule {}
