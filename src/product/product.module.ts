import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Size } from 'src/size/entities/size.entity';
import { Material } from 'src/material/entities/material.entity';
import { ProductSize } from './entities/product_size.entity';
import { ProductMaterial } from './entities/product-material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Size,
      Material,
      ProductSize,
      ProductMaterial,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
