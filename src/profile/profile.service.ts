import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class ProfileService {
    constructor(
        private readonly serviceUser : UserService,
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
}
