import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { TenantAdminModule } from './tenant-admin/tenant-admin.module';
import { StaffModule } from './staff/staff.module';
import { AttendeeModule } from './attendee/attendee.module';
import { PublicController } from './app/public.controller';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST', 'smtp.gmail.com'),
          port: parseInt(config.get('SMTP_PORT', '465')),
          ignoreTLS: true,
          secure: true,
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS'),
          },
        },
        defaults: {
          from: `"Event Ticketing System" <${config.get('SMTP_USER', 'noreply@example.com')}>`,
        },
      }),
      inject: [ConfigService],
    }),
    TenantAdminModule,
    AdminModule,
    AuthModule,
    StaffModule,
    AttendeeModule,
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
            ssl: { rejectUnauthorized: false },
          }
        : {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '665566',
            database: 'Saas',
            autoLoadEntities: true,
            synchronize: true,
          },
    ),
    EventsModule,
    TicketsModule,
    SharedModule,
  ],
  controllers: [PublicController],
  providers: [],
})
export class AppModule { }
