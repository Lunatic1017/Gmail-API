const { google } = require('googleapis');
// js object to store clientId , clientSecret , redirect
const googleConfig = {
  clientId: process.env.GCLIENTID,
  clientSecret:  process.env.GCLIENTSECRECT,
  redirect:  process.env.GREDIRECT,
};

// createing a connection to google by Oauth2.O 
function createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
  }
// js object to store Scope 
  const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://mail.google.com',

  ];

  //  granting permission to access google api  ( user email , gmail api access , users data )
  function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: defaultScope
    });
  }

// generating url to consent screen
  function urlGoogle() {

    const auth = createConnection(); 
    const url = getConnectionUrl(auth);
    return url;
  }



// exporting a function to login the account
exports.get_google_login = (req, res, next) => {
    const Gurl = urlGoogle()

    res.send(`<a href="${Gurl}">Login with Google</a>`)
    // res.status(200).json({url : Gurl})  // if you want json url only
  };

