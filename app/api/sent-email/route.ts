// import { NextApiRequest, NextApiResponse } from "next";
// import AWS from "aws-sdk";
// import { NextResponse } from "next/server";

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { body, method } = req;
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const params: AWS.SES.SendEmailRequest = {
//       Destination: {
//         ToAddresses: ["thiha.dve@gmail.com"], // Email address/addresses that you want to send your email
//       },
//       Message: {
//         Body: {
//           Html: {
//             Charset: "UTF-8",
//             Data: "<h1>Hello, this is a test email!</h1>",
//           },
//         },
//         Subject: {
//           Charset: "UTF-8",
//           Data: "Test email",
//         },
//       },
//       Source: process.env.AWS_SES_EMAIL ?? "", // The email address that is sending the email.
//     };

//     try {
//       const emailRes = await ses.sendEmail(params).promise();
//       return NextResponse.json({ success: true, data: emailRes });
//     } catch (error) {
//       console.error(error);
//       console.log("Error sending email");
//       return NextResponse.json(
//         { success: false, error: "thiha" },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: "thiha" },
//       { status: 500 }
//     );
//   }
// }

