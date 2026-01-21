import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserGuard } from '../user/guard/user.guard';
import { ChangePasswordDTO, ImageDTO } from '../dto/user.dto';
import { UpdateUserDTO } from '../dto/update.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly service:ProfileService){}

    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.OK)
    @Get('me')
    async GetProfile(@Query('username') username:string){
        return await this.service.GetProfile(username)
    }

    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.OK)
    @Get('image/auth')
    async GetImage(@Req() req){
        return await this.service.GetUploadAuth(req.user.username)
    }

    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.OK)
    @Patch('image')
    async UpdateProfileImage(@Req() req,@Body() dto:ImageDTO){
        return await this.service.updateProfileImage(req.user.id, dto.imageUrl)
    }

    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.CREATED)
    @Patch('change-password')
    async UpdatePassword(@Req() req, @Body() dto:ChangePasswordDTO){
        return await this.service.ChangePassword(req.user.username, dto.oldPassword, dto.newPassword)
    }

    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.CREATED)
    @Patch('update-profile')
    async UpdateProfile(@Req() req, @Body() dto:UpdateUserDTO){
        return await this.service.UpdateProfile(req.user.id, dto)
    }
}
