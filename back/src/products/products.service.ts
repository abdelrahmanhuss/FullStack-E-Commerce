import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, req: any) {
    let image_filename = `${req.file.filename}`;
    const product = await this.prisma.product.create({
      data: {
        ...data,
        image: image_filename,
      },
    });
    return {
      success: true,
      message: 'Product created successfully',
    };
  }

  async getAll() {
    return {
      success: true,
      message: 'Products fetched successfully',
      data: await this.prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
      }),
    };
  }

  async getOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

      return {
        success: true,
        message: 'Product fetched successfully',
        data: product,
      };
  }

  async removeProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    fs.unlinkSync(`public/uploads/${product.image}`);
    await this.prisma.product.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Product removed successfully',
    };
  }
  async getAllByCategory(category: string) {
    if (!category?.trim()) {
      throw new BadRequestException('Category is required');
    }

    return {
      success: true,
      message: 'Products fetched successfully',
      data: await this.prisma.product.findMany({
        where: { category },
        orderBy: { createdAt: 'desc' },
      }),
    };
  }
}
