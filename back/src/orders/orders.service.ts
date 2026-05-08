import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PlaceOrderDto } from './dto/place-order.dto';

@Injectable()
export class OrdersService {
  private stripe: InstanceType<typeof Stripe> | null = null;
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  private getStripe(): InstanceType<typeof Stripe> {
    if (this.stripe) return this.stripe;

    const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');

    if (!secretKey) {
      throw new InternalServerErrorException('Stripe secret key is missing');
    }

    this.stripe = new Stripe(secretKey);

    return this.stripe;
  }

  async placeOrder(userId: string, dto: PlaceOrderDto) {
    try {
      console.log(dto);
      const { items, amount, address } = dto;

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) throw new NotFoundException('User not found');

      const order = await this.prisma.order.create({
        data: {
          userId,
          items: items as any,
          amount,
          address: JSON.parse(JSON.stringify(address)),
          status: 'pending',
          payment: false,
        },
      });

      const line_items = items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Number(item.quantity),
      }));

      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping Fee',
          },
          unit_amount: 200,
        },
        quantity: 1,
      });

      const stripe = this.getStripe();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${this.config.get<string>(
          'FRONTEND_URL',
        )}/verify?success=true&orderId=${order.id}`,
        cancel_url: `${this.config.get<string>(
          'FRONTEND_URL',
        )}/verify?success=false&orderId=${order.id}`,
      });

      return {
        success: true,
        checkoutUrl: session.url,
      };
    } catch (error) {
      console.error('Error in placeOrder:', error);
      throw error;
    }
  }

  async verifyPayment(body: { orderId: string; success: boolean }) {
    const { orderId, success } = body;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new NotFoundException('Order not found');

    if (!success) {
      await this.prisma.order.delete({
        where: { id: orderId },
      });

      return {
        success: false,
        message: 'Payment failed, order cancelled',
      };
    }

    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        payment: true,
        status: 'paid',
      },
    });

    await this.prisma.user.update({
      where: { id: order.userId },
      data: {
        cartData: {} as any,
      },
    });

    return {
      success: true,
      message: 'Payment verified successfully',
    };
  }

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllOrders() {
    return {
      success: true,
      data: await this.prisma.order.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      }),
      message: 'Orders fetched successfully',
    };
  }

  async updateOrderStatus(id: string, status: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) throw new NotFoundException('Order not found');

    await this.prisma.order.update({
      where: { id },
      data: { status },
    });

    return {
      success: true,
      message: 'Order status updated successfully',
    };
  }
}
