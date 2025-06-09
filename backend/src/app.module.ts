import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PartnerModule } from './partner/partner.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: ".env.local"}), PartnerModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
