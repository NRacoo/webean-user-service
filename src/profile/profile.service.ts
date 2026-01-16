import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { UpdateUserDTO } from '../dto/update.dto';
import { ImagekitService } from '../database/imagekit/imagekit.service';

@Injectable()
export class ProfileService {
    constructor(
        private readonly serviceUser : UserService,
        private readonly imageKitService: ImagekitService
    ){}

    async GetProfile(username:string){
        const user = await this.serviceUser.FindUser(username);

        if(!user?.isVerified){
            throw new BadRequestException('please verify your account')
        }

        const userData = 
        {
            username: user.username,
            phone: user.phone,
            email:user.email,
            address:user.address,
            birth:user.birth,
            imageProfile:user.imageProfile
        }

       

        return {message: 'success', data:userData}
    }

    async ChangePassword(username:string, oldPassword:string, newPassword:string){
        const user = await this.serviceUser.FindUser(username);

        if(!user){
            throw new BadRequestException('user not found')
        }

        if(!user?.isVerified) {
            throw new BadRequestException('please verify your account')
        }

        const isMatched = await bcrypt.compare(oldPassword, user.password)

        if(!isMatched){
            throw new BadRequestException('password not match')
        }
        
        const isSame = await bcrypt.compare(newPassword, user.password)
        if(isSame){
            throw new BadRequestException('new password must be different')
        }

        const HashPassword = await bcrypt.hash(newPassword, 10)
        
        await this.serviceUser.UpdateByUsername(username, {password:HashPassword})

        return {message: 'password updated successfully'}
    }

    async UpdateProfile(userId:string, dto:UpdateUserDTO){
        if(dto.username){
            const exists = await this.serviceUser.FindUser(dto.username);
            if(exists?.isVerified){
                throw new BadRequestException('please verify your account')
            }
            if(exists?.username){
                throw new BadRequestException('username already used')
            };

            if(exists?.email){
                throw new BadRequestException('email already used')
            };

            if(exists?.phone){
                throw new BadRequestException('phone already used')
            };
        };

        await this.serviceUser.UpdateById(userId, dto);

        return {message: 'update success'}
    }

    async GetUploadAuth(username:string){
        const user = await this.serviceUser.FindUser(username);

        if(!user?.isVerified){
            throw new BadRequestException('please verify your account')
        };

        return this.imageKitService.getAuthParams()
    }

    async updateProfileImage(userId:string, imageUrl:string){
        if(!imageUrl){
            throw new BadRequestException('imageUrl is required');
        };

        if(!imageUrl.includes('ik.imagekit.io')){
            throw new BadRequestException('invalid image url');
        };

        await this.serviceUser.UpdateImageById(userId, imageUrl)

        return {message: 'upload image success', imageUrl:imageUrl}
    }
}
