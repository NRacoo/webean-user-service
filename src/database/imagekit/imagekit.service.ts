import ImageKit from 'imagekit'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class ImagekitService {
  private imagekit: ImageKit

  constructor() {
   const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
   const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
   const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

   if(!publicKey || !privateKey || !urlEndpoint){
    throw new BadRequestException('env is empty')
   }
   this.imagekit = new ImageKit({
    privateKey,
    publicKey,
    urlEndpoint
   });
  }
  

  getAuthParams() {
    return this.imagekit.getAuthenticationParameters()
  }
}
