import nodemailer from "nodemailer";
import { H3Error } from "h3";
import sgMail from "@sendgrid/mail";
import type { EmailOptions, User, Transaction } from "~/app/misc/types";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

const config = useRuntimeConfig();

export async function sendVerifyTransactionEmail(
  user: User,
  transaction: Transaction,
  token: string,
  password: string
): Promise<H3Error | true> {
  const emailers = ["nodemailer-service", "nodemailer-smtp", "sendgrid"];
  console.log("Preparing to send verification email");

  const appName = config.iamAppName;
  // Get emailer and url
  const emailer = config.iamEmailer;
  const url = config.iamPublicUrl;

  // nodemailer-service
  const service = config.iamNodemailerService;
  const serviceSender = config.iamNodemailerServiceSender;
  const servicePassword = config.iamNodemailerServicePassword;

  // nodemailer-smtp
  const smtpHost = config.iamNodemailerSmtpHost;
  const smtpPort = config.iamNodemailerSmtpPort;
  const smtpSender = config.iamNodemailerSmtpSender;
  const smtpPassword = config.iamNodemailerSmtpPassword;

  if (!emailers.includes(emailer)) {
    console.log(
      `Error: Emailer: ${emailer} is an unknown emailer. Aborting send.`
    );
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  const options = {
    to: user.email,
    subject: `${appName} please verify your email`,
    text: `
    Dear ${user.name},
    Thanks for buying with us. The leading online dental supply marketplace. Hopefully, the process was quick and simple for you.
    `,
    html: `<!DOCTYPE html>
        <html
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
        >
          <head>
            <title> </title>
            <!--[if !mso]><!-- -->
            <meta
              http-equiv="X-UA-Compatible"
              content="IE=edge"
            />
            <!--<![endif]-->
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=UTF-8"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <style type="text/css">
              #outlook a {
                padding: 0;
              }

              .ReadMsgBody {
                width: 100%;
              }

              .ExternalClass {
                width: 100%;
              }

              .ExternalClass * {
                line-height: 100%;
              }

              body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }

              table,
              td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }

              img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
              }

              p {
                display: block;
                margin: 13px 0;
              }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
              @media only screen and (max-width: 480px) {
                @-ms-viewport {
                  width: 320px;
                }
                @viewport {
                  width: 320px;
                }
              }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG />
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            <![endif]-->
            <!--[if lte mso 11]>
              <style type="text/css">
                .outlook-group-fix {
                  width: 100% !important;
                }
              </style>
            <![endif]-->

            <style type="text/css">
              @media only screen and (min-width: 480px) {
                .mj-column-per-100 {
                  width: 100% !important;
                }
              }
            </style>

            <style type="text/css"></style>
          </head>

          <body style="background-color: #f9f9f9">
            <div style="background-color: #f9f9f9">
              <!--[if mso | IE]>
              <table
                align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->

              <div
                style="
                  background: #f9f9f9;
                  background-color: #f9f9f9;
                  margin: 0px auto;
                  max-width: 600px;
                "
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background: #f9f9f9; background-color: #f9f9f9; width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          border-bottom: #333957 solid 5px;
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                          vertical-align: top;
                        "
                      >
                        <!--[if mso | IE]>
                          <table
                            role="presentation"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                          >
                            <tr></tr>
                          </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->

              <div
                style="
                  background: #fff;
                  background-color: #fff;
                  margin: 0px auto;
                  max-width: 600px;
                "
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background: #fff; background-color: #fff; width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          border: #dddddd solid 1px;
                          border-top: 0px;
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                          vertical-align: top;
                        "
                      >
                        <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                      style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->

                        <div
                          class="mj-column-per-100 outlook-group-fix"
                          style="
                            font-size: 13px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: bottom;
                            width: 100%;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="vertical-align: bottom"
                            width="100%"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="border-collapse: collapse; border-spacing: 0px"
                                >
                                  <tbody>
                                    <tr>
                                      <td style="width: 230px">
                                        <img
                                          height="auto"
                                          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2ZW7SFvODqYH8GwyUfc1dGpIDFLsX5KBKT9uhEbWAqrWo_0kQRDNh6Jd6DX4bdEVpa1uit1kjvkMa5UzB7HpFOKLtce9yUTg1RjKgY44yLiQNFokRhUCUr2KRbvxg-eS7opmRsSqb2KRcjyP7mO_Q2cBJsBP4sR2BqAtAt2VxiL5hRJ1gbB7dnvRnuRq2/s16000/logo-inver.png"
                                          style="
                                            border: 0;
                                            display: block;
                                            outline: none;
                                            text-decoration: none;
                                            width: 100%;
                                          "
                                          width="64"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 24px;
                                    font-weight: bold;
                                    line-height: 22px;
                                    text-align: center;
                                    color: #525252;
                                  "
                                >
                                  Thank you for your order
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="left"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 14px;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  <p>Dear ${user.name}</p>

                                  <p>
                                    Thanks for buying with us. The leading online dental
                                    supply marketplace. Hopefully, the process was quick
                                    and simple for you.
                                  </p>
                                  <p>
                                    To use your account, you’ll first need to verify
                                    your email via the button below.
                                  </p>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-top: 0px;
                                  padding-bottom: 15px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="border-collapse: separate; line-height: 100%"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      bgcolor="#e97c00"
                                      role="presentation"
                                      style="
                                        border: none;
                                        border-radius: 3px;
                                        color: #ffffff;
                                        cursor: auto;
                                        padding: 15px 25px;
                                      "
                                      valign="middle"
                                    >
                                      <p
                                        style="
                                          background: #e97c00;
                                          color: #e97c00;
                                          font-family: 'Helvetica Neue', Arial,
                                            sans-serif;
                                          font-size: 15px;
                                          font-weight: bold;
                                          line-height: 120%;
                                          margin: 0;
                                          text-decoration: none;
                                          text-transform: none;
                                        "
                                      >
                                        <a
                                          href="${url}/auth/verify-email?token=${token}"
                                          style="color: #fff; text-decoration: none"
                                        >
                                          Confirm Your Email</a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 20px;
                                    font-weight: bold;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  Here is a summary of your recent purchases :
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="left"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  0="[object Object]"
                                  1="[object Object]"
                                  2="[object Object]"
                                  border="0"
                                  style="
                                    cellspacing: 0;
                                    color: #000;
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 13px;
                                    line-height: 22px;
                                    table-layout: auto;
                                    width: 100%;
                                  "
                                >
                                  <tr
                                    style="
                                      border-bottom: 1px solid #ecedee;
                                      text-align: left;
                                    "
                                  >
                                    <th style="padding: 0 15px 10px 0">Item</th>
                                    <th style="padding: 0 15px">Qt.</th>
                                    <th
                                      style="padding: 0 0 0 15px"
                                      align="right"
                                    >
                                      Price
                                    </th>
                                  </tr>
                                  <tr>
                                    <td style="padding: 5px 15px 5px 0">Quantity</td>
                                    <td style="padding: 0 15px">${
                                      transaction.quantity
                                    }</td>
                                    <td
                                      style="padding: 0 0 0 15px"
                                      align="right"
                                    >
                                      $${transaction.amount}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 0 15px 5px 0">
                                      Shipping + Handling
                                    </td>
                                    <td style="padding: 0 15px">1</td>
                                    <td
                                      style="padding: 0 0 0 15px"
                                      align="right"
                                    >
                                      $0
                                    </td>
                                  </tr>
                                  <tr
                                    style="
                                      border-bottom: 2px solid #ecedee;
                                      text-align: left;
                                      padding: 15px 0;
                                    "
                                  >
                                    <td style="padding: 0 15px 5px 0">Sales Tax</td>
                                    <td style="padding: 0 15px">1</td>
                                    <td
                                      style="padding: 0 0 0 15px"
                                      align="right"
                                    >
                                      $0
                                    </td>
                                  </tr>
                                  <tr
                                    style="
                                      border-bottom: 2px solid #ecedee;
                                      text-align: left;
                                      padding: 15px 0;
                                    "
                                  >
                                    <td
                                      style="padding: 5px 15px 5px 0; font-weight: bold"
                                    >
                                      TOTAL
                                    </td>
                                    <td style="padding: 0 15px"></td>
                                    <td
                                      style="padding: 0 0 0 15px; font-weight: bold"
                                      align="right"
                                    >
                                      $${transaction.amount}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 16px;
                                    font-weight: normal;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  Here is the order invoice number :
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 24px;
                                    font-weight: bold;
                                    line-height: 22px;
                                    text-align: center;
                                    color: #525252;
                                    text-transform: uppercase;
                                  "
                                >
                                  ${transaction.orderID}
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 16px;
                                    font-weight: normal;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  You can use it to track your order here :
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-top: 10px;
                                  padding-bottom: 10px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="border-collapse: separate; line-height: 100%"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      bgcolor="#2F67F6"
                                      role="presentation"
                                      style="
                                        border: none;
                                        border-radius: 3px;
                                        color: #ffffff;
                                        cursor: auto;
                                        padding: 15px 25px;
                                      "
                                      valign="middle"
                                    >
                                      <p
                                        style="
                                          background: #2f67f6;
                                          color: #ffffff;
                                          font-family: 'Helvetica Neue', Arial,
                                            sans-serif;
                                          font-size: 15px;
                                          font-weight: normal;
                                          line-height: 120%;
                                          margin: 0;
                                          text-decoration: none;
                                          text-transform: none;
                                        "
                                      >
                                        <a
                                          href="${url}/tracking"
                                          style="color: #fff; text-decoration: none"
                                        >
                                          Check Shipping Status</a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 20px;
                                    font-weight: bold;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  Account information :
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <ul style="list-style: disc">
                                  <li
                                    style="
                                      font-family: 'Helvetica Neue', Arial, sans-serif;
                                      font-size: 16px;
                                      font-weight: 600;
                                      line-height: 22px;
                                      text-align: left;
                                      color: #525252;
                                    "
                                  >
                                    Name :
                                    <span
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                      >${user.name}</span
                                    >
                                  </li>
                                  <li
                                    style="
                                      font-family: 'Helvetica Neue', Arial, sans-serif;
                                      font-size: 16px;
                                      font-weight: 600;
                                      line-height: 22px;
                                      text-align: left;
                                      color: #525252;
                                    "
                                  >
                                    Email :
                                    <span
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                      >${user.email}</span
                                    >
                                  </li>
                                  <li
                                    style="
                                      font-family: 'Helvetica Neue', Arial, sans-serif;
                                      font-size: 16px;
                                      font-weight: 600;
                                      line-height: 22px;
                                      text-align: left;
                                      color: #525252;
                                    "
                                  >
                                    Password :
                                    <span
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                      >${password}</span
                                    >
                                  </li>
                                </ul>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="left"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 14px;
                                    line-height: 20px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  Best regards,<br /><br />
                                  Dentestore<br />1581 Commerce St. Corona CA 92880<br />
                                  <a
                                    href="${url}"
                                    style="color: #2f67f6"
                                    >${url.replace("https://", "")}</a
                                  >
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->

              <div style="margin: 0px auto; max-width: 600px">
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                          vertical-align: top;
                        "
                      >
                        <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                      style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->

                        <div
                          class="mj-column-per-100 outlook-group-fix"
                          style="
                            font-size: 13px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: bottom;
                            width: 100%;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td style="vertical-align: bottom; padding: 0">
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 0;
                                          word-break: break-word;
                                        "
                                      >
                                        <div
                                          style="
                                            font-family: 'Helvetica Neue', Arial,
                                              sans-serif;
                                            font-size: 12px;
                                            font-weight: 300;
                                            line-height: 1;
                                            text-align: center;
                                            color: #575757;
                                          "
                                        >
                                          1581 Commerce St. Corona CA 92880, USA
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 10;
                                          word-break: break-word;
                                        "
                                      >
                                        <div
                                          style="
                                            font-family: 'Helvetica Neue', Arial,
                                              sans-serif;
                                            font-size: 12px;
                                            font-weight: 300;
                                            line-height: 1;
                                            text-align: center;
                                            color: #575757;
                                          "
                                        >
                                          <a
                                            href=""
                                            style="color: #575757"
                                            >Unsubscribe</a
                                          >
                                          from our emails
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
            </div>
          </body>
        </html>
        `,
  } as EmailOptions;

  if (emailer === "nodemailer-service") {
    //Options to do with nodemailer-service
    const serviceOptions = options;
    serviceOptions.from = serviceSender;

    // Attempt to send
    const errorOrSent = await emailWithNodemailerService(
      serviceSender,
      servicePassword,
      service,
      serviceOptions
    );
    // If error, return error
    if (errorOrSent instanceof H3Error) {
      return errorOrSent;
    }

    // Otherwise its true
    return true;
  }

  // Sending with nodemailer-smtp
  if (emailer === "nodemailer-smtp") {
    //Options to do with nodemailer-smtp
    const smtpOptions = options;
    smtpOptions.from = smtpSender;

    // Attempt to send email
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  // Sending with SendGrid
  if (emailer === "sendgrid") {
    const sendgridOptions = options;
    sendgridOptions.from = config.iamSendgridSender;
    const errorOrSent = await emailWithSendgrid(options);

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  console.log("We should not get here");
  return createError({
    statusCode: 500,
    statusMessage: "Server error",
  });
}
export async function sendExitingUserTransaction(
  user: User,
  transaction: Transaction,
  password: string
): Promise<H3Error | true> {
  const emailers = ["nodemailer-service", "nodemailer-smtp", "sendgrid"];
  console.log("Preparing to send verification email");

  const appName = config.iamAppName;
  // Get emailer and url
  const emailer = config.iamEmailer;
  const url = config.iamPublicUrl;

  // nodemailer-service
  const service = config.iamNodemailerService;
  const serviceSender = config.iamNodemailerServiceSender;
  const servicePassword = config.iamNodemailerServicePassword;

  // nodemailer-smtp
  const smtpHost = config.iamNodemailerSmtpHost;
  const smtpPort = config.iamNodemailerSmtpPort;
  const smtpSender = config.iamNodemailerSmtpSender;
  const smtpPassword = config.iamNodemailerSmtpPassword;

  if (!emailers.includes(emailer)) {
    console.log(
      `Error: Emailer: ${emailer} is an unknown emailer. Aborting send.`
    );
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  const options = {
    to: user.email,
    subject: `${appName} Dentastore purchase receipt`,
    text: `
    Dear ${user.name},
    Thanks for buying with us. The leading online dental supply marketplace. Hopefully, the process was quick and simple for you.
    `,
    html: `<!DOCTYPE html>
            <html
              xmlns="http://www.w3.org/1999/xhtml"
              xmlns:v="urn:schemas-microsoft-com:vml"
              xmlns:o="urn:schemas-microsoft-com:office:office"
            >
              <head>
                <title> </title>
                <!--[if !mso]><!-- -->
                <meta
                  http-equiv="X-UA-Compatible"
                  content="IE=edge"
                />
                <!--<![endif]-->
                <meta
                  http-equiv="Content-Type"
                  content="text/html; charset=UTF-8"
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <style type="text/css">
                  #outlook a {
                    padding: 0;
                  }

                  .ReadMsgBody {
                    width: 100%;
                  }

                  .ExternalClass {
                    width: 100%;
                  }

                  .ExternalClass * {
                    line-height: 100%;
                  }

                  body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }

                  table,
                  td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  }

                  img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                  }

                  p {
                    display: block;
                    margin: 13px 0;
                  }
                </style>
                <!--[if !mso]><!-->
                <style type="text/css">
                  @media only screen and (max-width: 480px) {
                    @-ms-viewport {
                      width: 320px;
                    }
                    @viewport {
                      width: 320px;
                    }
                  }
                </style>
                <!--<![endif]-->
                <!--[if mso]>
                  <xml>
                    <o:OfficeDocumentSettings>
                      <o:AllowPNG />
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                  </xml>
                <![endif]-->
                <!--[if lte mso 11]>
                  <style type="text/css">
                    .outlook-group-fix {
                      width: 100% !important;
                    }
                  </style>
                <![endif]-->

                <style type="text/css">
                  @media only screen and (min-width: 480px) {
                    .mj-column-per-100 {
                      width: 100% !important;
                    }
                  }
                </style>

                <style type="text/css"></style>
              </head>

              <body style="background-color: #f9f9f9">
                <div style="background-color: #f9f9f9">
                  <!--[if mso | IE]>
                          <table
                            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->

                  <div
                    style="
                      background: #f9f9f9;
                      background-color: #f9f9f9;
                      margin: 0px auto;
                      max-width: 600px;
                    "
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background: #f9f9f9; background-color: #f9f9f9; width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-bottom: #333957 solid 5px;
                              direction: ltr;
                              font-size: 0px;
                              padding: 20px 0;
                              text-align: center;
                              vertical-align: top;
                            "
                          >
                            <!--[if mso | IE]>
                              <table
                                role="presentation"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                              >
                                <tr></tr>
                              </table>
                            <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          
                          <table
                            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->

                  <div
                    style="
                      background: #fff;
                      background-color: #fff;
                      margin: 0px auto;
                      max-width: 600px;
                    "
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background: #fff; background-color: #fff; width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border: #dddddd solid 1px;
                              border-top: 0px;
                              direction: ltr;
                              font-size: 0px;
                              padding: 20px 0;
                              text-align: center;
                              vertical-align: top;
                            "
                          >
                            <!--[if mso | IE]>
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    
                            <tr>
                          
                                <td
                                  style="vertical-align:bottom;width:600px;"
                                >
                              <![endif]-->

                            <div
                              class="mj-column-per-100 outlook-group-fix"
                              style="
                                font-size: 13px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: bottom;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: bottom"
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="border-collapse: collapse; border-spacing: 0px"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="width: 230px">
                                            <img
                                              height="auto"
                                              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2ZW7SFvODqYH8GwyUfc1dGpIDFLsX5KBKT9uhEbWAqrWo_0kQRDNh6Jd6DX4bdEVpa1uit1kjvkMa5UzB7HpFOKLtce9yUTg1RjKgY44yLiQNFokRhUCUr2KRbvxg-eS7opmRsSqb2KRcjyP7mO_Q2cBJsBP4sR2BqAtAt2VxiL5hRJ1gbB7dnvRnuRq2/s16000/logo-inver.png"
                                              style="
                                                border: 0;
                                                display: block;
                                                outline: none;
                                                text-decoration: none;
                                                width: 100%;
                                              "
                                              width="64"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 24px;
                                        font-weight: bold;
                                        line-height: 22px;
                                        text-align: center;
                                        color: #525252;
                                      "
                                    >
                                      Thank you for your order
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 14px;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      <p>Dear ${user.name}</p>

                                      <p>
                                        Thanks for buying with us. The leading online dental
                                        supply marketplace. Hopefully, the process was quick
                                        and simple for you.
                                      </p>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 20px;
                                        font-weight: bold;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      Here is a summary of your recent purchases :
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      0="[object Object]"
                                      1="[object Object]"
                                      2="[object Object]"
                                      border="0"
                                      style="
                                        cellspacing: 0;
                                        color: #000;
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 13px;
                                        line-height: 22px;
                                        table-layout: auto;
                                        width: 100%;
                                      "
                                    >
                                      <tr
                                        style="
                                          border-bottom: 1px solid #ecedee;
                                          text-align: left;
                                        "
                                      >
                                        <th style="padding: 0 15px 10px 0">Item</th>
                                        <th style="padding: 0 15px">Qt.</th>
                                        <th
                                          style="padding: 0 0 0 15px"
                                          align="right"
                                        >
                                          Price
                                        </th>
                                      </tr>
                                      <tr>
                                        <td style="padding: 5px 15px 5px 0">Quantity</td>
                                        <td style="padding: 0 15px">
                                          ${transaction.quantity}
                                        </td>
                                        <td
                                          style="padding: 0 0 0 15px"
                                          align="right"
                                        >
                                          $${transaction.amount}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding: 0 15px 5px 0">
                                          Shipping + Handling
                                        </td>
                                        <td style="padding: 0 15px">1</td>
                                        <td
                                          style="padding: 0 0 0 15px"
                                          align="right"
                                        >
                                          $0
                                        </td>
                                      </tr>
                                      <tr
                                        style="
                                          border-bottom: 2px solid #ecedee;
                                          text-align: left;
                                          padding: 15px 0;
                                        "
                                      >
                                        <td style="padding: 0 15px 5px 0">Sales Tax</td>
                                        <td style="padding: 0 15px">1</td>
                                        <td
                                          style="padding: 0 0 0 15px"
                                          align="right"
                                        >
                                          $0
                                        </td>
                                      </tr>
                                      <tr
                                        style="
                                          border-bottom: 2px solid #ecedee;
                                          text-align: left;
                                          padding: 15px 0;
                                        "
                                      >
                                        <td
                                          style="padding: 5px 15px 5px 0; font-weight: bold"
                                        >
                                          TOTAL
                                        </td>
                                        <td style="padding: 0 15px"></td>
                                        <td
                                          style="padding: 0 0 0 15px; font-weight: bold"
                                          align="right"
                                        >
                                          $${transaction.amount}
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      Here is the order invoice number :
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 24px;
                                        font-weight: bold;
                                        line-height: 22px;
                                        text-align: center;
                                        color: #525252;
                                        text-transform: uppercase;
                                      "
                                    >
                                      ${transaction.orderID}
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      You can use it to track your order here :
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="border-collapse: separate; line-height: 100%"
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          bgcolor="#2F67F6"
                                          role="presentation"
                                          style="
                                            border: none;
                                            border-radius: 3px;
                                            color: #ffffff;
                                            cursor: auto;
                                            padding: 15px 25px;
                                          "
                                          valign="middle"
                                        >
                                          <p
                                            style="
                                              background: #2f67f6;
                                              color: #ffffff;
                                              font-family: 'Helvetica Neue', Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              font-weight: normal;
                                              line-height: 120%;
                                              margin: 0;
                                              text-decoration: none;
                                              text-transform: none;
                                            "
                                          >
                                            <a
                                              href="${url}/tracking"
                                              style="color: #fff; text-decoration: none"
                                            >
                                              Check Shipping Status</a
                                            >
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 20px;
                                        font-weight: bold;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      Account information :
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <ul style="list-style: disc">
                                      <li
                                        style="
                                          font-family: 'Helvetica Neue', Arial, sans-serif;
                                          font-size: 16px;
                                          font-weight: 600;
                                          line-height: 22px;
                                          text-align: left;
                                          color: #525252;
                                        "
                                      >
                                        Name :
                                        <span
                                          style="
                                            font-family: 'Helvetica Neue', Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: normal;
                                            line-height: 22px;
                                            text-align: left;
                                            color: #525252;
                                          "
                                          >${user.name}</span
                                        >
                                      </li>
                                      <li
                                        style="
                                          font-family: 'Helvetica Neue', Arial, sans-serif;
                                          font-size: 16px;
                                          font-weight: 600;
                                          line-height: 22px;
                                          text-align: left;
                                          color: #525252;
                                        "
                                      >
                                        Email :
                                        <span
                                          style="
                                            font-family: 'Helvetica Neue', Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: normal;
                                            line-height: 22px;
                                            text-align: left;
                                            color: #525252;
                                          "
                                          >${user.email}</span
                                        >
                                      </li>
                                      <li
                                        style="
                                          font-family: 'Helvetica Neue', Arial, sans-serif;
                                          font-size: 16px;
                                          font-weight: 600;
                                          line-height: 22px;
                                          text-align: left;
                                          color: #525252;
                                        "
                                      >
                                        Password :
                                        <span
                                          style="
                                            font-family: 'Helvetica Neue', Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: normal;
                                            line-height: 22px;
                                            text-align: left;
                                            color: #525252;
                                          "
                                          >${password}</span
                                        >
                                      </li>
                                    </ul>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 14px;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      Best regards,<br /><br />
                                      Dentestore<br />1581 Commerce St. Corona CA 92880<br />
                                      <a
                                        href="${url}"
                                        style="color: #2f67f6"
                                        >${url.replace("https://", "")}</a
                                      >
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>

                            <!--[if mso | IE]>
                                </td>
                              
                            </tr>
                          
                                      </table>
                                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          
                          <table
                            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 20px 0;
                              text-align: center;
                              vertical-align: top;
                            "
                          >
                            <!--[if mso | IE]>
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    
                            <tr>
                          
                                <td
                                  style="vertical-align:bottom;width:600px;"
                                >
                              <![endif]-->

                            <div
                              class="mj-column-per-100 outlook-group-fix"
                              style="
                                font-size: 13px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: bottom;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: bottom; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              font-size: 0px;
                                              padding: 0;
                                              word-break: break-word;
                                            "
                                          >
                                            <div
                                              style="
                                                font-family: 'Helvetica Neue', Arial,
                                                  sans-serif;
                                                font-size: 12px;
                                                font-weight: 300;
                                                line-height: 1;
                                                text-align: center;
                                                color: #575757;
                                              "
                                            >
                                              1581 Commerce St. Corona CA 92880, USA
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              font-size: 0px;
                                              padding: 10;
                                              word-break: break-word;
                                            "
                                          >
                                            <div
                                              style="
                                                font-family: 'Helvetica Neue', Arial,
                                                  sans-serif;
                                                font-size: 12px;
                                                font-weight: 300;
                                                line-height: 1;
                                                text-align: center;
                                                color: #575757;
                                              "
                                            >
                                              <a
                                                href=""
                                                style="color: #575757"
                                                >Unsubscribe</a
                                              >
                                              from our emails
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <!--[if mso | IE]>
                                </td>
                              
                            </tr>
                          
                                      </table>
                                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          <![endif]-->
                </div>
              </body>
            </html>
`,
  } as EmailOptions;

  if (emailer === "nodemailer-service") {
    //Options to do with nodemailer-service
    const serviceOptions = options;
    serviceOptions.from = serviceSender;

    // Attempt to send
    const errorOrSent = await emailWithNodemailerService(
      serviceSender,
      servicePassword,
      service,
      serviceOptions
    );
    // If error, return error
    if (errorOrSent instanceof H3Error) {
      return errorOrSent;
    }

    // Otherwise its true
    return true;
  }

  // Sending with nodemailer-smtp
  if (emailer === "nodemailer-smtp") {
    //Options to do with nodemailer-smtp
    const smtpOptions = options;
    smtpOptions.from = smtpSender;

    // Attempt to send email
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  // Sending with SendGrid
  if (emailer === "sendgrid") {
    const sendgridOptions = options;
    sendgridOptions.from = config.iamSendgridSender;
    const errorOrSent = await emailWithSendgrid(options);

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  console.log("We should not get here");
  return createError({
    statusCode: 500,
    statusMessage: "Server error",
  });
}
export async function sendResetEmail(
  user: User,
  token: string
): Promise<H3Error | true> {
  const emailers = ["nodemailer-service", "nodemailer-smtp", "sendgrid"];
  console.log("Preparing to send reset email");

  const appName = config.iamAppName;
  // Get emailer and url
  const emailer = config.iamEmailer;
  const url = config.iamPublicUrl;

  // nodemailer-service
  const service = config.iamNodemailerService;
  const serviceSender = config.iamNodemailerServiceSender;
  const servicePassword = config.iamNodemailerServicePassword;

  // nodemailer-smtp
  const smtpHost = config.iamNodemailerSmtpHost;
  const smtpPort = config.iamNodemailerSmtpPort;
  const smtpSender = config.iamNodemailerSmtpSender;
  const smtpPassword = config.iamNodemailerSmtpPassword;

  // Check if emailer is valid
  if (!emailers.includes(emailer)) {
    console.log(
      `Error: Emailer: ${emailer} is an unknown emailer. Aborting send.`
    );
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  // Common email options
  const options = {
    to: user.email,
    subject: `${appName} reset password link`,
    text: `
    Hello ${user.name},
    You requested to reset your password. Please follow the link below. If you did not request to reset your password, 
    disregard this email. Your last login time was: ${user.last_login}.
      
    This is a one-time password link that will reveal a temporary password.
  
    Password reset link: ${url}/auth/verify-reset?token=${token}
    `,
    html: `
    <p>Hello ${user.name}</p>,
    <p>You requested to reset your password. Please follow the link below. If you did not request to reset your password, 
    disregard this email. Your last login time was: ${user.last_login}.</p>
    <p>This is a one-time password link that will reveal a temporary password.</p>
    <p>Password reset link: ${url}/auth/verify-reset?token=${token}</p>`,
  } as EmailOptions;

  // Sending with nodemailer-service
  if (emailer === "nodemailer-service") {
    //Options to do with nodemailer-service
    const serviceOptions = options;
    serviceOptions.from = serviceSender;

    // Attempt to send
    const errorOrSent = await emailWithNodemailerService(
      serviceSender,
      servicePassword,
      service,
      serviceOptions
    );

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  // Sending with nodemailer-smtp
  if (emailer === "nodemailer-smtp") {
    //Options to do with nodemailer-smtp
    const smtpOptions = options;
    smtpOptions.from = smtpSender;

    // Attempt to send email
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  // Sending with Sendgrid
  if (emailer === "sendgrid") {
    const sendgridOptions = options;
    sendgridOptions.from = config.iamSendgridSender;
    const errorOrSent = await emailWithSendgrid(options);

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  // Otherwise return error
  console.log("We should not get here");
  return createError({
    statusCode: 500,
    statusMessage: "Server error",
  });
}
export async function sendVerifyEmail(
  user: User,
  token: string
): Promise<H3Error | true> {
  const emailers = ["nodemailer-service", "nodemailer-smtp", "sendgrid"];
  console.log("Preparing to send verification email");

  const appName = config.iamAppName;
  // Get emailer and url
  const emailer = config.iamEmailer;
  const url = config.iamPublicUrl;

  // nodemailer-service
  const service = config.iamNodemailerService;
  const serviceSender = config.iamNodemailerServiceSender;
  const servicePassword = config.iamNodemailerServicePassword;

  // nodemailer-smtp
  const smtpHost = config.iamNodemailerSmtpHost;
  const smtpPort = config.iamNodemailerSmtpPort;
  const smtpSender = config.iamNodemailerSmtpSender;
  const smtpPassword = config.iamNodemailerSmtpPassword;

  // Check if emailer is valid
  if (!emailers.includes(emailer)) {
    console.log(
      `Error: Emailer: ${emailer} is an unknown emailer. Aborting send.`
    );
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  // Common email options
  const options = {
    to: user.email,
    subject: `${appName} please verify your email`,
    text: `
    Hello ${user.name},
    You recently created an account at ${url} on ${user.created_at}. Please verify your email to continue with your account. Please follow the link below to verify your email. 
      
    Follow the link to verify your email: ${url}/auth/verify-email?token=${token}
    `,
    html: `
    <p>Hello ${user.name}</p>,
    <p>You recently created an account at ${url} on ${user.created_at}. Please verify your email to continue with your account. Please follow the link below to verify your email.</p> 
      
    <p>Follow the link to verify your email: ${url}/auth/verify-email?token=${token}</p>`,
  } as EmailOptions;

  // Sending with nodemailer-service
  if (emailer === "nodemailer-service") {
    //Options to do with nodemailer-service
    const serviceOptions = options;
    serviceOptions.from = serviceSender;

    // Attempt to send
    const errorOrSent = await emailWithNodemailerService(
      serviceSender,
      servicePassword,
      service,
      serviceOptions
    );
    // If error, return error
    if (errorOrSent instanceof H3Error) {
      return errorOrSent;
    }

    // Otherwise its true
    return true;
  }

  // Sending with nodemailer-smtp
  if (emailer === "nodemailer-smtp") {
    //Options to do with nodemailer-smtp
    const smtpOptions = options;
    smtpOptions.from = smtpSender;

    // Attempt to send email
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  // Sending with Sendgrid
  if (emailer === "sendgrid") {
    const sendgridOptions = options;
    sendgridOptions.from = config.iamSendgridSender;
    const errorOrSent = await emailWithSendgrid(options);

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;

    // Otherwise its true
    return true;
  }

  // Otherwise return error
  console.log("We should not get here");
  return createError({
    statusCode: 500,
    statusMessage: "Server error",
  });
}
export async function emailWithSendgrid(
  options: EmailOptions
): Promise<H3Error | true> {
  const apiKey = config.iamSendGridApiKey;
  let emailError = null;

  // If Sendgrid api key not found
  if (!apiKey) {
    console.log("Sendgrid Api key not found. Cannot send email. Aborting.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // Attempting to send mail with Sendgrid
  sgMail.setApiKey(apiKey);

  // Create messag object
  const msg = {
    to: options.to,
    from: options.from, // Change to your verified sender
    subject: options.subject,
    text: options.text ? options.text : "",
    html: options.html ? options.html : options.text,
  };

  console.log("=======SENDGRID EMAIL OPTIONS =========================");
  console.log("from: ", msg.from);
  console.log("to: ", msg.to);
  console.log("subject: ", msg.subject);
  console.log("=======SENDGRID EMAIL OPTIONS END=========================");

  // Send email
  console.log("Attempting to send email with Sendgrid");
  console.log(
    "Sendgrid requires verified senders. Make sure your sender is verified by Sendgrid."
  );
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
      emailError = error;
    });

  // If error, return error
  if (emailError) {
    console.log("Error when sending email in Sendgrid");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // If successful
  return true;
}
export async function emailWithNodemailerService(
  sender: string,
  password: string,
  service: string,
  options: EmailOptions
): Promise<H3Error | true> {
  // Error flag
  let ErrorFound;

  const emailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };
  // Sending email using nodemailer-service
  console.log("Attempting to send mail using nodemailer-service");

  if (!service) {
    console.log("Error: Service not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // Check for email user
  if (!sender) {
    console.log("Error: Sender email not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // Check for password
  if (!password) {
    console.log("Error: Email password not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  console.log("=======NODEMAILER-SERVICE EMAIL OPTIONS=============");
  console.log("service: ", service);
  console.log("from: ", emailOptions.from);
  console.log("to: ", emailOptions.to);
  console.log("password: ", password);
  console.log("=========NODEMAILER-SERVICE EMAIL OPTIONS END=================");

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: sender,
      pass: password,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // Check if email server is ready to take our messages
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("Email server verify problem");
      ErrorFound = error;
    } else {
      console.log("Server is ready to take our messages");
      console.log("Success: ", success);
    }
  });
  // If transporter verify error, return
  if (ErrorFound) {
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // Attempt to send email
  transporter.sendMail(emailOptions, (err, result) => {
    console.log(`Attempting to send email to user: ${options.to}`);
    // If error, log error and return
    if (err) {
      console.log(err);
      console.log("Send email error");
      ErrorFound = err;
    } else {
      console.log("Email successfully sent");
      console.log("Email result: ", result);
    }
  });
  // If errorFound, return error
  if (ErrorFound) {
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }
  // Otherwise successful
  return true;
}
export async function emailWithNodemailerSmtp(
  sender: string,
  password: string,
  host: string,
  port: string,
  options: EmailOptions
): Promise<H3Error | true> {
  // Error flag
  let errorFound = null;

  const emailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  // Sending email using nodemailer-service
  console.log("Attempting to send mail using nodemailer-SMTP");

  if (!host) {
    console.log("Error: Email host not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // Check for email user
  if (!sender) {
    console.log("Error: Sender email not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // Check for password
  if (!sender) {
    console.log("Error: Sender password not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  console.log("=======NODEMAILER-SMTP EMAIL OPTIONS=============");
  console.log("host: ", host);
  console.log("port: ", port);
  console.log("user: ", sender);
  console.log("=========NODEMAILER-SMTP EMAIL OPTIONS END=================");

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: host,
    port: parseInt(port),
    pool: true,
    secure: true,
    auth: {
      user: sender,
      pass: password,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  } as SMTPTransport.Options);

  // Check if email server is ready to take our messages
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("Email server verify problem");
      errorFound = error;
    } else {
      console.log("Server is ready to take our messages");
      console.log("Success: ", success);
    }
  });

  // If transporter verify error, return
  if (errorFound)
    return createError({ statusCode: 500, statusMessage: "Server error" });

  // Attempt to send email
  transporter.sendMail(emailOptions, (err, result) => {
    console.log(`Attempting to send email to user: ${options.to}`);

    // If error, log error and return
    if (err) {
      console.log(err);
      errorFound = err;
      console.log("Send email error");
    } else {
      console.log("Email successfully sent");
      console.log("Email result: ", result);
    }
  });

  // If errorFound, return error
  if (errorFound)
    return createError({ statusCode: 500, statusMessage: "Server error" });

  // Otherwise successful
  return true;
}
