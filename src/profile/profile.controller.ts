import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserGuard } from '../user/user.guard';
import { ChangePasswordDTO } from '../dto/user.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly service:ProfileService){}

    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    @Get('me')
    async GetProfile(@Query('username') username:string){
        return await this.service.GetProfile(username)
    }

    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.CREATED)
    @Patch('change-password')
    async UpdatePassword(@Req() req, @Body() dto:ChangePasswordDTO){
        return await this.service.ChangePassword(req.user.username, dto.oldPassword, dto.newPassword)
    }
}
