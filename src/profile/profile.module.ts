import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserModule } from '../user/user.module';
import { ImagekitModule } from '../database/imagekit/image.module';

@Module({
  controllers: [ProfileController],
  providers:[ProfileService],
  imports:[UserModule, ImagekitModule]
})
export class ProfileModule {}
