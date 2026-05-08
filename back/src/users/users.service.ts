import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        cartData: [],
      },
    });

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      token,
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      token,
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return {
      success: true,
      data: users,
    };
  }
  async deleteUser(userId: string) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
    return {
      success: true,
      message: `User deleted successfully`,
    };
  }
  async makeAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return {
        success: false,
        message: `User not found`,
      };
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isAdmin: true,
        role: 'ADMIN',
      },
    });
    return {
      success: true,
      message: `User promoted to admin successfully`,
    };
  }
  async demoteToUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return {
        success: false,
        message: `User not found`,
      };
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isAdmin: false,
        role: 'USER',
      },
    });
    return {
      success: true,
      message: `User demoted to regular user successfully`,
    };
  }
}
