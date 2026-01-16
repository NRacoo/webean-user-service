import { NestFactory } from '@nestjs/core'
import * as bcrypt from 'bcrypt'
import { AppModule } from 'src/app.module'
import { DatabaseService } from 'src/database/database.service'


async function main () {
    const appcontext = await NestFactory.createApplicationContext(AppModule)
    const db = appcontext.get(DatabaseService)

    try {
        const username = process.env.USER
        const password = process.env.PASS
        const email = process.env.MAIL_USER

        if(!username || !password || !email){
            throw new Error('invalid username or password')
        }

        const hash = await bcrypt.hash(password, 10)
        const admin = await db.user.create(
            {
                data:{
                    username:username,
                    password:hash,
                    email:email,
                    phone:'0812345678',
                    address:'Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung 40257, Jawa Barat.',
                    role: 'ADMIN',
                    isVerified: true
                }
            }
        )
        console.log('Admin successfully added: ', admin)
    } catch (error) {
        console.log('error: ', error)
    }finally{
        await appcontext.close()
    }
}   

main()