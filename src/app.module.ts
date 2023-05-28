import { Module } from '@nestjs/common';
import { ConfigOptionModule } from './config/config.module';

@Module({
  imports: [ConfigOptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
