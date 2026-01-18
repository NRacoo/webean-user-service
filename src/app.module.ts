import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { UserService } from './user/user.service';
import { MailService } from './mail/mail.service';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { ImagekitModule } from './database/imagekit/image.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UserModule, DatabaseModule, MailModule, ProfileModule, ImagekitModule],
  controllers: [AppController],
  providers: [AppService, UserService, MailService, ProfileService],
})
export class AppModule {}
