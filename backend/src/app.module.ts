import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: ".env.local"}), PartnerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
