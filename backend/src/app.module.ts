import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PartnerModule } from './request/request.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: ".env.local"}), PartnerModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
