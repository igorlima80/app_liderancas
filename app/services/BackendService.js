import {
  getString,
  setString,
  getBoolean,
  setBoolean
} from "tns-core-modules/application-settings";

const tokenKey = "token";
// const userIdKey = "userId";
const deviceToken = "deviceToken";
const notificationKey = "notification"
const initialKey = "initial"
// const userKey = "user"

/**
 * Parent service class. Has common configs and methods.
 */
export default class BackendService {
  constructor() {
    this.baseUrl = "https://testapi.io/api/jomauricio/";
    // this.baseUrl = "http://app.liderancas.net.br/api/";
    this.apiUrl = "";
  }

  isLoggedIn() {
    console.log('GETTING TOKEN LOGGED IN: ' + getString(tokenKey))
    return !!getString(tokenKey);
  }

  // isLoggedIn() {
  //   console.log('GETTING ID LOGGED IN: ' + getString(userIdKey))
  //   return !!getString(userIdKey);
  // }


  get token() {
    console.log('GETTING TOKEN: ' + getString(tokenKey))
    return getString(tokenKey);
  }

  set token(newToken) {
    setString(tokenKey, newToken);
    console.log('TOKEN SET TO: ' + newToken)
  }

  // get userId() {
  //   console.log('GETTING userId: ' + getString(userIdKey))
  //   return getString(userIdKey);
  // }

  // set userId(newUserId) {
  //   setString(userIdKey, newUserId);
  //   console.log('userId SET TO: ' + newUserId)
  // }

  get deviceToken() {
    console.log('GETTING diviceToken: ' + getString(deviceToken))
    return getString(deviceToken);
  }

  set deviceToken(newDeviceToken) {
    setString(deviceToken, newDeviceToken);
    console.log('deviceToken SET TO: ' + newDeviceToken)
  }

  // get user() {
  //   console.log("GETTING USER: " + getString(userKey));
  //   return getString(userKey);
  // }

  // set user(newUser) {
  //   setString(userKey, newUser);
  //   console.log("USER SET TO: " + newUser);
  // }

  get notification() {
    console.log("GETTING NOTIFICATION: " + getBoolean(notificationKey));
    return getBoolean(notificationKey, true);
  }

  set notification(value) {
    setBoolean(notificationKey, value);
    console.log('NOTIFICATION SET TO: ' + value)
  }

  get initial() {
    console.log('GETTING INITIAL: ' + getBoolean(initialKey))
    return getBoolean(initialKey, true);
  }

  set initial(value) {
    setBoolean(initialKey, value);
    console.log('NOTIFICATION SET TO: ' + value)
  }

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }
      console.log('Response with code: ' + response.statusCode +
        '\nContent: ' + response.content.toString())
      reject('Response with code: ' + response.statusCode +
        '\nContent: ' + response.content.toString())
    })
  }

  getJson(response) {
    return new Promise((resolve, reject) => {
      console.info('Content: ' + response.content.toString())
      resolve(response.content.toJSON())
    })
      .catch(e => {
        console.error('Error parsing JSON response: ' + e)
        throw 'Error parsing JSON response: ' + e
      })
  }
}