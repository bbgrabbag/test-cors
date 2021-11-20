import {mockData} from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';


// this function checks whether there is a path, then build the url with the current path
let removeQuery = () => {
    if(window.history.pushState && window.location.pathname) {
        let newurl = 
            window.location.protocol + 
            '//' +
            window.location.host +
            window.location.pathname;
            window.history.pushState('', '', newurl);
    } else {
        let newurl = window.location.protocol + '//' + window.location.host;
        window.history.pushState('', '', newurl);
    }
};

let checkToken = async(accessToken) => {
    let result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
    .then((res)=>res.json())
    .catch((error)=>error.json());

    return result;
}

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */


export let extractLocations = (events) => {
    let extractLocations = events.map((event) => event.location);
    let locations = [...new Set(extractLocations)];
    return locations;
  };


  export let getEvents = async () => {
    NProgress.start();
  
    if (window.location.href.startsWith("http://localhost")) {
      NProgress.done();
      return mockData;
    }
  
  
    let token = await getAccessToken();
  
    if (token) {
      removeQuery();
      let url = 'https://56a0p7pzx8.execute-api.us-west-1.amazonaws.com/dev/api/token/' + token;
      let result = await axios.get(url);
      if (result.data) {
        var locations = extractLocations(result.data.events);
        localStorage.setItem("lastEvents", JSON.stringify(result.data));
        localStorage.setItem("locations", JSON.stringify(locations));
      }
      NProgress.done();
      return result.data.events;
    }
  };


export let getAccessToken = async () => {
    let accessToken = localStorage.getItem('access_token');
    let tokenCheck = accessToken && (await checkToken(accessToken));

    if(!accessToken || tokenCheck.error) { //starts by checking if there is an access token or error in checking
        await localStorage.removeItem('access_token');
        let searchParams = new URLSearchParams(window.location.search);
        let code = await searchParams.get('code');

        if(!code) { //if no authorization code is found
            let results = await axios.get('https://56a0p7pzx8.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url');
            let {authUrl} = results.data;
            return (window.location.href = authUrl);
    }
    return code && getToken(code);
}
return accessToken;
};


let getToken = async (code) => {
    let encodeCode = encodeURIComponent(code);
    let {access_token} = await fetch(
        'https://56a0p7pzx8.execute-api.us-west-1.amazonaws.com/dev/api/token/' + encodeCode
    )
    .then((res) => {
        return res.json();
    })
    .catch((error) => error);

    access_token && localStorage.setItem('access_token', access_token);

    return access_token;
}