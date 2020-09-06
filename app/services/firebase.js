let firebase = require("nativescript-plugin-firebase");
import LoginService from "~/services/LoginService";
const loginService = new LoginService();

let firebaseService = {
    init() {
        firebase
            .subscribeToTopic("notifications")
            .then(() => console.log("Subscribed to topic notifications"));
        firebase
            .init({
                showNotificationsWhenInForeground: false,
                // onMessageReceivedCallback: function (message) {
                //     console.log("Title: " + message.title);
                //     console.log("Body: " + message.body);
                //     if (loginService.isLoggedIn() && message.data.next) {
                //         vm.$navigator.navigate(next)
                //     }
                // },
                onPushTokenReceivedCallback: function (token) {
                    loginService.deviceToken = token;
                    // console.log("Firebase push token: " + token);
                }
            })
            .then(
                function () {
                    console.log("firebase.init done");
                },
                function (error) {
                    console.log("firebase.init error: " + error);
                }
            );
    }
}



export default firebaseService;