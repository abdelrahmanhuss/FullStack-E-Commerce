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

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async findAll() {
    return await this.usersService.getAllUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteUser(@Param('id') userId: string) {
    return await this.usersService.deleteUser(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('make-admin/:id')
  async makeAdmin(@Param('id') userId: string) {
    return await this.usersService.makeAdmin(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('demote/:id')
  async demoteToUser(@Param('id') userId: string) {
    return await this.usersService.demoteToUser(userId);
  }
}
