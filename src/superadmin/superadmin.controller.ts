import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateTenantDto,
  UpdateTenantDto,
  UpdateTenantStatusDto,
  CreateTenantUserDto,
  UpdateTenantUserDto,
  UpdateTenantUserStatusDto,
  CreateWebhookEventDto,
  UpdateWebhookEventDto,
  UpdateWebhookEventStatusDto,
  CreatePaymentDto,
  UpdatePaymentDto,
  UpdatePaymentStatusDto,
  CreateActivityLogDto,
  UserQueryDto,
  TenantQueryDto,
  TenantUserQueryDto,
  WebhookEventQueryDto,
  PaymentQueryDto,
  ActivityLogQueryDto,
} from './superadmin.dto';
import { SuperAdminService } from './superadmin.service';

@Controller('superadmin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  // User endpoints (Platform Users)
  @Post('users')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.superAdminService.createUser(createUserDto);
  }

  @Get('users')
  @UsePipes(new ValidationPipe())
  getAllUsers(@Query() query: UserQueryDto) {
    return this.superAdminService.getAllUsers(query);
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return this.superAdminService.getUserById(id);
  }

  @Put('users/:id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.superAdminService.updateUser(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.superAdminService.deleteUser(id);
  }

  // Tenant endpoints
  @Post('tenants')
  @UsePipes(new ValidationPipe())
  createTenant(@Body() createTenantDto: CreateTenantDto) {
    return this.superAdminService.createTenant(createTenantDto);
  }

  @Get('tenants')
  @UsePipes(new ValidationPipe())
  getAllTenants(@Query() query: TenantQueryDto) {
    return this.superAdminService.getAllTenants(query);
  }

  @Get('tenants/:id')
  getTenantById(@Param('id') id: string) {
    return this.superAdminService.getTenantById(id);
  }

  @Put('tenants/:id')
  @UsePipes(new ValidationPipe())
  updateTenant(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return this.superAdminService.updateTenant(id, updateTenantDto);
  }

  @Patch('tenants/:id/status')
  @UsePipes(new ValidationPipe())
  updateTenantStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateTenantStatusDto,
  ) {
    return this.superAdminService.updateTenantStatus(id, updateStatusDto);
  }

  @Delete('tenants/:id')
  deleteTenant(@Param('id') id: string) {
    return this.superAdminService.deleteTenant(id);
  }

  // Tenant User endpoints
  @Post('tenant-users')
  @UsePipes(new ValidationPipe())
  createTenantUser(@Body() createTenantUserDto: CreateTenantUserDto) {
    return this.superAdminService.createTenantUser(createTenantUserDto);
  }

  @Get('tenant-users')
  @UsePipes(new ValidationPipe())
  getAllTenantUsers(@Query() query: TenantUserQueryDto) {
    return this.superAdminService.getAllTenantUsers(query);
  }

  @Get('tenant-users/:id')
  getTenantUserById(@Param('id') id: string) {
    return this.superAdminService.getTenantUserById(id);
  }

  @Put('tenant-users/:id')
  @UsePipes(new ValidationPipe())
  updateTenantUser(
    @Param('id') id: string,
    @Body() updateTenantUserDto: UpdateTenantUserDto,
  ) {
    return this.superAdminService.updateTenantUser(id, updateTenantUserDto);
  }

  @Patch('tenant-users/:id/status')
  @UsePipes(new ValidationPipe())
  updateTenantUserStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateTenantUserStatusDto,
  ) {
    return this.superAdminService.updateTenantUserStatus(id, updateStatusDto);
  }

  @Delete('tenant-users/:id')
  deleteTenantUser(@Param('id') id: string) {
    return this.superAdminService.deleteTenantUser(id);
  }

  // Webhook Event endpoints
  @Post('webhook-events')
  @UsePipes(new ValidationPipe())
  createWebhookEvent(@Body() createWebhookEventDto: CreateWebhookEventDto) {
    return this.superAdminService.createWebhookEvent(createWebhookEventDto);
  }

  @Get('webhook-events')
  @UsePipes(new ValidationPipe())
  getAllWebhookEvents(@Query() query: WebhookEventQueryDto) {
    return this.superAdminService.getAllWebhookEvents(query);
  }

  @Get('webhook-events/:id')
  getWebhookEventById(@Param('id') id: string) {
    return this.superAdminService.getWebhookEventById(id);
  }

  @Put('webhook-events/:id')
  @UsePipes(new ValidationPipe())
  updateWebhookEvent(
    @Param('id') id: string,
    @Body() updateWebhookEventDto: UpdateWebhookEventDto,
  ) {
    return this.superAdminService.updateWebhookEvent(id, updateWebhookEventDto);
  }

  @Patch('webhook-events/:id/status')
  @UsePipes(new ValidationPipe())
  updateWebhookEventStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateWebhookEventStatusDto,
  ) {
    return this.superAdminService.updateWebhookEventStatus(id, updateStatusDto);
  }

  @Delete('webhook-events/:id')
  deleteWebhookEvent(@Param('id') id: string) {
    return this.superAdminService.deleteWebhookEvent(id);
  }

  // Payment endpoints
  @Post('payments')
  @UsePipes(new ValidationPipe())
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.superAdminService.createPayment(createPaymentDto);
  }

  @Get('payments')
  @UsePipes(new ValidationPipe())
  getAllPayments(@Query() query: PaymentQueryDto) {
    return this.superAdminService.getAllPayments(query);
  }

  @Get('payments/:id')
  getPaymentById(@Param('id') id: string) {
    return this.superAdminService.getPaymentById(id);
  }

  @Put('payments/:id')
  @UsePipes(new ValidationPipe())
  updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.superAdminService.updatePayment(id, updatePaymentDto);
  }

  @Patch('payments/:id/status')
  @UsePipes(new ValidationPipe())
  updatePaymentStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdatePaymentStatusDto,
  ) {
    return this.superAdminService.updatePaymentStatus(id, updateStatusDto);
  }

  @Delete('payments/:id')
  deletePayment(@Param('id') id: string) {
    return this.superAdminService.deletePayment(id);
  }

  // Activity Log endpoints
  @Post('activity-logs')
  @UsePipes(new ValidationPipe())
  createActivityLog(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.superAdminService.createActivityLog(createActivityLogDto);
  }

  @Get('activity-logs')
  @UsePipes(new ValidationPipe())
  getAllActivityLogs(@Query() query: ActivityLogQueryDto) {
    return this.superAdminService.getAllActivityLogs(query);
  }

  @Get('activity-logs/:id')
  getActivityLogById(@Param('id') id: string) {
    return this.superAdminService.getActivityLogById(id);
  }

  @Delete('activity-logs/:id')
  deleteActivityLog(@Param('id') id: string) {
    return this.superAdminService.deleteActivityLog(id);
  }
}
