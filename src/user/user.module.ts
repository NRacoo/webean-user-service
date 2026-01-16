import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTConstants } from '../../constants';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[DatabaseModule,
    JwtModule.register({
      global:true,
      secret: JWTConstants.secret,
      signOptions: {expiresIn: '1h'}
    }),
    MailModule
  ],
  exports:[UserService]
})
export class UserModule {}
