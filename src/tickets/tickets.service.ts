import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private ticketRepository: Repository<TicketEntity>,
  ) {}

  async getTicketsByEvent(eventId: string) {
    return this.ticketRepository.find({
      where: { eventId, status: 'available' },
      order: { price: 'ASC' },
    });
  }

  async createTicket(eventId: string, ticketData: Partial<TicketEntity>) {
    const ticket = this.ticketRepository.create({ ...ticketData, eventId });
    return this.ticketRepository.save(ticket);
  }

  async updateTicket(id: string, ticketData: Partial<TicketEntity>) {
    await this.ticketRepository.update(id, ticketData);
    return this.ticketRepository.findOne({ where: { id } });
  }

  async deleteTicket(id: string) {
    return this.ticketRepository.delete(id);
  }
}
