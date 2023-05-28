import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from 'src/auth/auth.module';
import { FeedBackModule } from 'src/feed_back/feed_back.module';
import { MaterialModule } from 'src/material/material.module';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { SizeModule } from 'src/size/size.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthModule,
    FeedBackModule,
    MaterialModule,
    OrderModule,
    ProductModule,
    SizeModule,
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ConfigService.configTypeormPostgres()),
    MailerModule.forRoot({
      transport: {
        host: process.env.CONFIG_NODE_MAIL_HOST,
        port: process.env.CONFIG_NODE_MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.CONFIG_NODE_MAIL_USERNAME_AUTH,
          pass: process.env.CONFIG_NODE_MAIL_PASSWORD_AUTH,
        },
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigOptionModule {}
