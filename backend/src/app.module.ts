import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PartnerModule } from './request/request.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: ".env.local"}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PartnerModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
