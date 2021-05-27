const { google } = require("googleapis");
const fetch = require("node-fetch");

var fs = require("fs");

// This function will get us the access token and the refresh token
//This will also give us user email
// We use async function because of usage of OAuth2.0
async function getGtoken(req) {
  // creating oauth2 object
  const oauth2Client = new google.auth.OAuth2(
    process.env.GCLIENTID,
    process.env.GCLIENTSECRECT,
    process.env.GREDIRECT
  );

  try {
    // Google request for tokens
    const { tokens } = await oauth2Client.getToken(req.query.code);

    console.log(tokens.refresh_token);
    console.log(tokens.access_token);
    console.log(JSON.stringify(tokens));

  //  node fetch to get email address 
    fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        let saveGtoken = {
          refresh_token: tokens.refresh_token,
          access_token: tokens.access_token,
          scope: tokens.scope,
          email: result.email,
        };

        console.log(saveGtoken);
        saveGtokenStr = JSON.stringify(saveGtoken);
        // saving user data in clientCredentials.json file
        fs.writeFile(
          "././clientCredentials.json",
          saveGtokenStr,
          function (err) {
            if (err) throw err;
            console.log("Saved!");
            return true;
          }
        );
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }

  return tokens;
}

// main api route
exports.get_users_credentials = (req, res, next) => {
  // caling getGtoken funtion to store token
  const isTokenSaved = getGtoken(req);
  if (isTokenSaved) {
    res.send(
      "<h1>Successful</h1> <p>  Users Credentials registered now you can post your email from POST:http://localhost:9002/api/send-email <br/>  </p>"
    );
  } else {
    res.send("no");
  }
};
