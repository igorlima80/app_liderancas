import {
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  FETCH_USER,
  RESET_PASSWORD
} from "~/store/actions.type";
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_TOKEN,
  SET_INITIAL
} from "~/store/mutations.type";
import LoginService from "~/services/LoginService";
import { clear } from "tns-core-modules/application-settings";

const loginService = new LoginService();

const state = {
  user: {user:{}},
  errors: null
};

const getters = {
  user: state => state.user
};

const actions = {
  [LOGIN](context, cpf) {
    return new Promise((resolve, reject) => {
      loginService
        .login(cpf)
        .then(data => {
          if ('status' in data) {
            resolve(data);
          }else{
          console.info("User logged in with token: " + data.cpf);
          console.dir("User data:" + data);
          context.commit(SET_TOKEN, `${data.id}`);
          context.commit(SET_AUTH, data);
          resolve(data);
          }
        })
        .catch(error => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  // [REGISTER](context, user) {
  //   return new Promise((resolve, reject) => {
  //     loginService
  //       .register(user)
  //       .then(data => {
  //         context.commit(SET_TOKEN, data.authtoken);
  //         resolve(data);
  //       })
  //       .catch(error => {
  //         context.commit(SET_ERROR, error);
  //         reject(error);
  //       });
  //   });
  // },
  [RESET_PASSWORD](context, email) {
    return new Promise((resolve, reject) => {
      loginService
        .resetPassword(email)
        .then(data => {
          // context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  },
  [FETCH_USER](context, id) {
    return new Promise((resolve, reject) => {
      loginService
        .user(id)
        .then(data => {
          console.dir("User data: " + data);
          context.commit(SET_TOKEN, `${data.id}`);
          context.commit(SET_AUTH, data);
          resolve();
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          context.commit(PURGE_AUTH);
          reject(error);
        });
    });
  },
  [UPDATE_USER](context, user) {
    return new Promise((resolve, reject) => {
      loginService
        .updateUser(user)
        .then(data => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_TOKEN](state, token) {
    loginService.token = token;
    // loginService.userId = `${token}`;
  },
  [SET_AUTH](state, user) {
    state.user = user;
    state.errors = {};
  },
  [SET_INITIAL](state, initial) {
    loginService.initial = initial;
    state.errors = {};
  },
  [PURGE_AUTH](state) {
    state.user = { user: {} };
    state.errors = {};
    clear();
  }
};
// export this module.
export default {
  state,
  mutations,
  actions,
  getters
};
