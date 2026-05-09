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

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(@Body() dto: CreateNotificationDto) {
    return await this.notificationsService.createNotification(dto);
  }

  @Get('list')
  async getAllNotifications() {
    return await this.notificationsService.getAllNotifications();
  }

  @Delete('delete/:id')
  async deleteNotification(@Param('id') id: string) {
    return await this.notificationsService.deleteNotification(id);
  }
  @Delete('clear')
  async clearAllNotifications() {
    return await this.notificationsService.clearAllNotifications();
  }
  @Patch('read/:id')
  async markAsRead(@Param('id') id: string) {
    return await this.notificationsService.updateNotification(id, {
      isRead: true,
    });
  }
}
