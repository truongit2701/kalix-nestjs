import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Feedback } from 'src/feed_back/entities/feed_back.entity';
import { Material } from 'src/material/entities/material.entity';
import { Order } from 'src/order/entities/order.entity';
import { ProductMaterial } from 'src/product/entities/product-material.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductSize } from 'src/product/entities/product_size.entity';
import { Size } from 'src/size/entities/size.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ConfigService {
  static configTypeormPostgres(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.CONFIG_HOST_POSTGRES,
      port: parseInt(process.env.CONFIG_PORT_POSTGRES),
      username: process.env.CONFIG_USER_POSTGRES,
      password: process.env.CONFIG_PASSWORD_POSTGRES,
      database: process.env.CONFIG_DATABASE_NAME_POSTGRES,
      entities: [
        User,
        Product,
        Order,
        Size,
        Material,
        Feedback,
        ProductSize,
        ProductMaterial,
        Auth,
      ],
      synchronize: true,
    };
  }
}
