// success-page.html.ts (atau taruh di file yang sama sementara)
export const successPage = () => `
<!DOCTYPE html>
<html>
<head>
  <title>Email Verified</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f6f8; display: flex; justify-content: center; align-items: center; height: 100vh;">
  
  <div style="max-width: 500px; width: 100%; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 20px;">
    
    <div style="background: #5E936C; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Success!</h1>
    </div>

    <div style="padding: 40px 30px; text-align: center; color: #333;">

      <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">Email Verified Successfully</h2>
      
      <p style="font-size: 15px; color: #666; line-height: 1.6; margin-bottom: 30px;">
        Thank you! Your email has been verified. You can now close this window or log in to your account.
      </p>
    </div>

    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;">
      © ${new Date().getFullYear()} Webean. All rights reserved.
    </div>
  </div>

</body>
</html>
`;