import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Public()
  @Get('event/:eventId')
  async getTicketsByEvent(@Param('eventId') eventId: string) {
    return this.ticketsService.getTicketsByEvent(eventId);
  }

  @Post('event/:eventId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TenantAdmin')
  async createTicket(@Param('eventId') eventId: string, @Body() body: any) {
    return this.ticketsService.createTicket(eventId, body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TenantAdmin')
  async updateTicket(@Param('id') id: string, @Body() body: any) {
    return this.ticketsService.updateTicket(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TenantAdmin')
  async deleteTicket(@Param('id') id: string) {
    return this.ticketsService.deleteTicket(id);
  }
}
