import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return await this.usersService.signup(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.usersService.login(body);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('list')
  async findAll() {
    return await this.usersService.getAllUsers();
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('delete/:id')
  async deleteUser(@Param('id') userId: string) {
    return await this.usersService.deleteUser(userId);
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('make-admin/:id')
  async makeAdmin(@Param('id') userId: string) {
    return await this.usersService.makeAdmin(userId);
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('demote/:id')
  async demoteToUser(@Param('id') userId: string) {
    return await this.usersService.demoteToUser(userId);
  }
}
