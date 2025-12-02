import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import {
  CheckoutDto,
  ValidateDiscountCodeDto,
  OrderLookupDto,
} from './attendee.dto';

@Controller('attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  /**
   * GET /attendee/events
   * Get all public events
   */
  @Get('events')
  @HttpCode(HttpStatus.OK)
  getAllEvents() {
    return this.attendeeService.getAllPublicEvents();
  }

  /**
   * GET /attendee/events/:slug
   * Get event by slug
   */
  @Get('events/slug/:slug')
  @HttpCode(HttpStatus.OK)
  getEventBySlug(@Param('slug') slug: string) {
    return this.attendeeService.getEventBySlug(slug);
  }

  /**
   * GET /attendee/events/:id
   * Get event by ID
   */
  @Get('events/:id')
  @HttpCode(HttpStatus.OK)
  getEventById(@Param('id') id: string) {
    return this.attendeeService.getEventById(id);
  }

  /**
   * GET /attendee/events/:eventId/ticket-types
   * Get ticket types for an event
   */
  @Get('events/:eventId/ticket-types')
  @HttpCode(HttpStatus.OK)
  getTicketTypesForEvent(@Param('eventId') eventId: string) {
    return this.attendeeService.getTicketTypesForEvent(eventId);
  }

  /**
   * POST /attendee/discount-codes/validate
   * Validate a discount code
   */
  @Post('discount-codes/validate')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  validateDiscountCode(@Body() dto: ValidateDiscountCodeDto) {
    return this.attendeeService.validateDiscountCode(dto);
  }

  /**
   * POST /attendee/checkout
   * Create order and tickets (checkout flow)
   */
  @Post('checkout')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  checkout(@Body() checkoutDto: CheckoutDto) {
    return this.attendeeService.checkout(checkoutDto);
  }

  /**
   * GET /attendee/orders
   * Get order history by email
   */
  @Get('orders')
  @HttpCode(HttpStatus.OK)
  getOrdersByEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    return this.attendeeService.getOrdersByEmail(email);
  }

  /**
   * GET /attendee/orders/:orderId
   * Get order by ID (requires email query param for verification)
   */
  @Get('orders/:orderId')
  @HttpCode(HttpStatus.OK)
  getOrderById(
    @Param('orderId') orderId: string,
    @Query('email') email: string,
  ) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    return this.attendeeService.getOrderById(orderId, email);
  }

  /**
   * GET /attendee/orders/:orderId/tickets
   * Get tickets for an order (requires email query param for verification)
   */
  @Get('orders/:orderId/tickets')
  @HttpCode(HttpStatus.OK)
  getTicketsForOrder(
    @Param('orderId') orderId: string,
    @Query('email') email: string,
  ) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    return this.attendeeService.getTicketsForOrder(orderId, email);
  }
}
