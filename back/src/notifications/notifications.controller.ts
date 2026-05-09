import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './dto/create-notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async createNotification(@Body() dto: CreateNotificationDto) {
    return await this.notificationsService.createNotification(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('list')
  async getAllNotifications() {
    return await this.notificationsService.getAllNotifications();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('delete/:id')
  async deleteNotification(@Param('id') id: string) {
    return await this.notificationsService.deleteNotification(id);
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('clear')
  async clearAllNotifications() {
    return await this.notificationsService.clearAllNotifications();
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('read/:id')
  async markAsRead(@Param('id') id: string) {
    return await this.notificationsService.updateNotification(id, {
      isRead: true,
    });
  }
}
