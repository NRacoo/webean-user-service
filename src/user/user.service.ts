import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma : DatabaseService,
        private readonly mailService: MailService,
        private readonly JwtService : JwtService
    ){}

    async CreateUser(dto:UserDTO){
        if(!dto.email){
            throw new BadRequestException("use verified email!")
        }
        if(!dto.username || !dto.password){
            throw new BadRequestException("username or password are required")
        };

       const existingUsername = await this.prisma.user.findUnique(
        {where: {username : dto.username}}
       );

       if(existingUsername){
        throw new BadRequestException("username already used")
       };

       const existingEmail = await this.prisma.user.findUnique(
        {
            where: {email: dto.email}
        }
       );
       if(existingEmail){
        throw new BadRequestException("email already used")
       };

       const hash = await bcrypt.hash(dto.password, 10);

       const verifyToken = crypto.randomBytes(32).toString('hex');
       const expiredAt = new Date(Date.now() + 1000 * 60 * 60)

       const verifyLink = `http://localhost:3000/user/verify-email?token=${verifyToken}`
       
       await this.prisma.user.create(
        {
            data:{
                username:dto.username,
                password:hash,
                phone:dto.phone,
                email:dto.email,
                address:dto.address,
                birth: new Date(dto.birth),

                isVerified: false,
                verifyToken,
                verifyExpiredAt: expiredAt,
            },
        },
       );

       await this.mailService.sendVerifyEmail(dto.email, dto.username, verifyLink);
       return {message: "succesfully created"}

    }

    async GetVerify(token:string){
        const user = await this.prisma.user.findFirst(
            {
                where: 
                {
                    verifyToken: token,
                    verifyExpiredAt:
                    {
                        gt: new Date()
                    }
                }
            }
        );
        if (!user){
            throw new BadRequestException('invalid or expired token');
        }

        await this.prisma.user.update(
            {
                where:
                {
                    id: user.id
                },
                data:
                {
                    isVerified: true,
                    verifyToken:null,
                    verifyExpiredAt:null
                }
            }
        )
    }

    async Login(data: UserDTO) : Promise <{access_token: string, message: string, result: any}>{
        const {username, password} = data;

        const user = await this.prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if(!user){
            throw new BadRequestException('user not found')
        };

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            throw new BadRequestException('password not match')
        };

        const payload = {id : user.id, username: user.username, role: user.role};

        const access_token = await this.JwtService.signAsync(payload)

        return {message: 'login success', result: payload, access_token}
    }

    async FindUser(username:string){

        return await this.prisma.user.findUnique(
            {
                where: {
                    username: username
                }
            }
        )
    }

    async UpdateByUsername(username:string, data:Partial<User>){
        return await this.prisma.user.update(
            {
                where: {username},
                data
            }
        )
    }

}
