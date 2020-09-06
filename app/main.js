import Vue from 'nativescript-vue'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'
import VueDevtools from 'nativescript-vue-devtools'
import Navigator from 'nativescript-vue-navigator'
import Pager from 'nativescript-pager/vue'
import RadDataForm from 'nativescript-ui-dataform/vue';
import RadListView from 'nativescript-ui-listview/vue';
import RadAutoComplete from 'nativescript-ui-autocomplete/vue';
import FloatingActionButtonPlugin from 'nativescript-material-floatingactionbutton/vue';
import CardViewPlugin from 'nativescript-material-cardview/vue';
import DateTimePicker from "nativescript-datetimepicker/vue";
import { TNSFontIcon, fonticon } from "nativescript-fonticon";
import firebaseService from '~/services/firebase';
import DrawerContent from "./components/DrawerContent";
import App from './components/App'
import {routes} from './routes'
import store from './store'
import LoginService from "~/services/LoginService";
const loginService = new LoginService();
let firebase = require("nativescript-plugin-firebase");

Vue.use(RadSideDrawer)
Vue.use(RadDataForm)
Vue.use(RadAutoComplete);
Vue.use(Pager);
Vue.use(RadListView);
Vue.use(CardViewPlugin);
Vue.use(FloatingActionButtonPlugin);
Vue.use(DateTimePicker);
Vue.use(Navigator, { routes })
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
Vue.registerElement(
  'MaskedTextField',
  () => require('nativescript-masked-text-field').MaskedTextField
);

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

TNSFontIcon.paths = {
  fa: "./assets/css/font-awesome.css"
};
TNSFontIcon.loadCss();
Vue.filter("fonticon", fonticon);

firebaseService.init();

new Vue({
  created() {
    firebase.addOnMessageReceivedCallback(
      function(message) {
        console.log("Title: " + message.title);
        console.log("Body: " + message.body);
        if (loginService.isLoggedIn() && message.data.next) {
          console.log("Ir para: " + message.data.next);
          // this.$navigator.navigate(message.data.next)
        }
      }
    )
  },
  store,
  render (h) {
      return h(
        App,
        [
          h(DrawerContent, { slot: 'drawerContent' }),
          h({ slot: 'mainContent' })
        ]
      )
    }
}).$start()
