import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PlaceOrderDto } from './dto/place-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('place')
  async placeOrder(@Req() req: any, @Body() dto: PlaceOrderDto) {
    return await this.ordersService.placeOrder(req.user.sub, dto);
  }

  @Post('verify')
  async verifyPayment(@Body() body: any) {
    return await this.ordersService.verifyPayment(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userorders')
  async getMyOrders(@Req() req: any) {
    return await this.ordersService.getUserOrders(req.user.sub);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('list')
  async getAllOrders() {
    return await this.ordersService.getAllOrders();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('status/:id')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return await this.ordersService.updateOrderStatus(id, status);
  }
}
