const { google } = require("googleapis");  
const nodemailer = require("nodemailer"); 
var Credentials = require("./clientCredentials.json");

// 
const googleConfig = {
  clientId: process.env.GCLIENTID,
  clientSecret: process.env.GCLIENTSECRECT,
  redirect: process.env.GREDIRECT,
  refresh: Credentials.refresh_token,
};

// creating OAuth2.0 client
const oauth2clint = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

oauth2clint.setCredentials({ refresh_token: Credentials.refresh_token });

// creating a function to send the mail using the input from the user
async function sendGMail(res) {
console.log(res.body);
  try {
    const accesstoken = await oauth2clint.getAccessToken();
// using nodemailer to send the email
    const transport = nodemailer.createTransport({
      service: "gmail",
      //entering the auth object to authenticate the data
      auth: {
        type: "oauth2",
        user: Credentials.email,
        clientId: process.env.GCLIENTID,
        clientSecret :  process.env.GCLIENTSECRECT,
        refreshToken: Credentials.refresh_token,
        accessToken: accesstoken,
      },
    });

    const mailOption = {
      from: Credentials.email,
      to: res.body.to,
      subject: res.body.subject,
      text: res.body.text,
    };
    const result = await transport.sendMail(mailOption);
    return result;
  } catch (error) {
    return error;
  }
}
// exporting a function to be used in API call which uses the sendGmail function
exports.post_send_email = (req, res, next) => {

  sendGMail(req)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        result
      });
    })
    .catch((error) => {
      console.log(error);
    });

};
