import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import multer from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import CreateProductDto from './dto/createProduct.dto';

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

@Controller('products')
export class ProductsController {
  private readonly upload = multer({ storage });

  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('image', { storage }))
  @UsePipes(new ValidationPipe())
  // @UseGuards(JwtAuthGuard)
  create(
    @Body() body: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productsService.create(body, file);
  }
  @Get('list')
  getAll() {
    return this.productsService.getAll();
  }

  @Get('category/:category')
  getAllByCategory(@Param('category') category: string) {
    return this.productsService.getAllByCategory(category);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productsService.getOne(id);
  }
  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.removeProduct(id);
  }
}
