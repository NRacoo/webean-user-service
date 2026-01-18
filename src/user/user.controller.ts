import { BadGatewayException, BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../dto/user.dto';
import { AdminGuard } from './guard/admin.guard';
import * as express from 'express'
import { successPage } from '../mail/success.html';


@Controller('user')
export class UserController {
    constructor(
        private readonly service:UserService,
     ){}

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async Create(@Body() data:UserDTO){
        try {
            return this.service.CreateUser(data); 
        } catch (error) {
            return {status: 500, message: error}
        }   
    }

    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('new-user')
    async NewUser(@Body() dto:UserDTO){
        try {
            return this.service.CreateUserByUser(dto)
            
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async Login(@Body() data:UserDTO){
        try {
            return this.service.Login(data)
            
        } catch (error) {
            return {status: 500, message: error}
        };
    }

    @HttpCode(HttpStatus.OK)
    @Get('verify-email')
    async VerifyEmail(@Query('token') token:string, @Res() res: express.Response){
        await this.service.GetVerify(token)

        return res.send(successPage())

    }
}
