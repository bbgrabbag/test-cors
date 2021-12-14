//“handler.js” file is where you’ll write the code for your functions

let {google} = require('googleapis');
// let OAuth2 = google.auth.OAuth2;
let calendar = google.calendar('v3');

let scopes = ["https://www.googleapis.com/auth/calendar.readonly"];

//If you see “process.env” this means
//the value is in the “config.json” file. This is a best practice as it keeps your API secrets hidden.
let credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://artincf93.github.io/Meetupp-app/"],
  javascript_origins: ["https://artincf93.github.io", "http://localhost:8080", "http://localhost:3000"],
};
let {client_secret, client_id, redirect_uris, calendar_id} = credentials;
let oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

//The first step in the OAuth process is to generate a URL so users can log in with Google and be authorized to see your calendar. After logging in, they'll recieve a code as a URL paramter
module.exports.getAuthURL = async() => {
  let authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};


module.exports.getAccessToken = async(event) => {
  let oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  let code = decodeURIComponent(`${event.pathParameters.code}`);
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if(err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      return {
        statusCode: 200,
        body: JSON.stringify(token),
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    })
}


module.exports.getCalendarEvents = async(event) => {
  let oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  let access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.setCredentials({ access_token });
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  }).then((results) => {
      return {
        statusCode: 200,
        body: JSON.stringify({ events: results.data.items }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        },
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    })
}