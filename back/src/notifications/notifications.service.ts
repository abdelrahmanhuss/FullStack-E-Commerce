import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(dto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: {
        message: dto.message,
        orderId: dto.orderId,
        userId: dto.userId,
      },
    });
    return {
      success: true,
      data: notification,
      message: 'Notification created successfully',
    };
  }

  async getUserNotifications(userId: string) {
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return {
      success: true,
      data: notifications,
      message: 'Notifications fetched successfully',
    };
  }

  async getAllNotifications() {
    try {
      const notifications = await this.prisma.notification.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      });
      return {
        success: true,
        data: notifications,
        message: 'All notifications fetched successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch notifications',
      };
    }
  }

  async updateNotification(id: string, dto: UpdateNotificationDto) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) throw new NotFoundException('Notification not found');

    const updatedNotification = await this.prisma.notification.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      data: updatedNotification,
      message: 'Notification updated successfully',
    };
  }

  async deleteNotification(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) throw new NotFoundException('Notification not found');

    await this.prisma.notification.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Notification deleted successfully',
    };
  }
  async clearAllNotifications() {
    await this.prisma.notification.deleteMany({});
    return {
      success: true,
      message: 'All notifications cleared successfully',
    };
  }
  async markAsRead(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) throw new NotFoundException('Notification not found');
    return await this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
