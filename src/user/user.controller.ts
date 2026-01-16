import { BadGatewayException, BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../dto/user.dto';


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

    @HttpCode(HttpStatus.ACCEPTED)
    @Get('verify-email')
    async VerifyEmail(@Query('token') token:string){
        await this.service.GetVerify(token)
        return {message: 'Email verified successfully'}

    }
}
