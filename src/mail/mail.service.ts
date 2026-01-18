import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async sendVerifyEmail(
    email: string,
    username: string,
    verifyLink: string
  ) {
    return this.mailer.sendMail({
      to: email,
      subject: 'Verify Your Email Address',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          
          <div style="background: #5E936C; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Verify Your Email</h1>
          </div>

          <div style="padding: 30px; color: #333;">
            <p style="font-size: 16px;">
              Hi <b>${username}</b>,
            </p>

            <p style="font-size: 14px; line-height: 1.6;">
              Thank you for registering. Please confirm your email address by clicking the button below.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${verifyLink}"
                style="
                  background-color: #5E936C;
                  color: #ffffff;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                  display: inline-block;
                ">
                Verify Email
              </a>
            </div>

            <p style="font-size: 13px; color: #666;">
              This link will expire in <b>1 hour</b>.
            </p>

            <p style="font-size: 13px; color: #666;">
              If the button doesn&apos;t work, copy and paste this link into your browser:
            </p>

            <p style="font-size: 12px; word-break: break-all;">
              <a href="${verifyLink}" style="color: #5E936C;">
                Here.
              </a>
            </p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

            <p style="font-size: 12px; color: #999;">
              If you did not create this account, you can safely ignore this email.
            </p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Webean. All rights reserved.
        </p>
      </div>
      `,
    });
  }

  async sendSuccessVerifyEmail(
    email: string,
    username: string,
  ) {
    return this.mailer.sendMail({
      to: email,
      subject: 'Welcome! Email Successfully Verified',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          
          <div style="background: #5E936C; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Email Verified!</h1>
          </div>

          <div style="padding: 30px; color: #333; text-align: center;">

            <p style="font-size: 16px; margin-bottom: 20px;">
              Hi <b>${username}</b>,
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #555;">
              Congratulations! Your email address has been successfully verified. 
              Your account is now fully active, and you are ready to get started.
            </p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

            <p style="font-size: 12px; color: #999;">
              Thank you for joining us!
            </p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Webean. All rights reserved.
        </p>
      </div>
      `,
    });
  }
}
