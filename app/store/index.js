import Vue from "nativescript-vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import liderancas from "./modules/liderancas";
// import db from "./modules/db";
// import { INIT_DB } from "~/store/actions.type";

Vue.use(Vuex);

let debug = process.env.NODE_ENV !== "production";

let store = new Vuex.Store({
  modules: {
    auth,
    liderancas
    // db
  },
  strict: debug
});

Vue.prototype.$store = store;

export default store;

// store.dispatch(INIT_DB);
