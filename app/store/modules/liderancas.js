import {
  CHANGE_NOTIFICATION,
  GET_NOTIFICATIONS,
  UPDATE_LEADER,
  GET_NEAR_MEMBERS,
  GET_UNVISITED_MEMBERS,
  GET_VOTERS,
  UPDATE_VOTER,
  ADD_VOTER,
  GET_VISITS,
  UPDATE_VISIT,
  ADD_VISIT,
  GET_CITES,
  FIND_ZIPCODE,
  FIND_CITY_IBGE
} from "~/store/actions.type";
import {
  SET_NOTIFICATION,
  SET_NOTIFICATIONS,
  SET_INITIAL,
  SET_VOTERS,
  SET_VISITS
} from "~/store/mutations.type";
import LiderancasService from "~/services/LiderancasService";
let firebase = require("nativescript-plugin-firebase");
const liderancasService = new LiderancasService();

const state = {
  notifications: {},
  voters: {},
  visits: {}
};

const getters = {
  notifications: state => state.notifications,
  notifications_quant: state => state.notifications.length,
  voters: state => state.voters,
  visits: state => state.visits,
  recent_voters: state => state.voters.slice(0, 5),
  near_voters: state => state.voters.slice(0, 5)
};

const actions = {
  [CHANGE_NOTIFICATION](context, notification) {
    if (notification) {
      firebase
        .subscribeToTopic("notifications")
        .then(() => console.log("Subscribed to topic notifications"));
    } else {
      firebase
        .unsubscribeFromTopic("notifications")
        .then(() => console.log("Unsubscribed from topic notifications"));
    }
    context.commit(SET_NOTIFICATION, notification);
  },
  [GET_NOTIFICATIONS](context) {
    return new Promise((resolve, reject) => {
      liderancasService
        .notifications()
        .then(data => {
          console.info("notifications: " + data);
          context.commit(SET_NOTIFICATIONS, data);
          resolve();
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          reject(error);
        });
    });
  },
  [UPDATE_LEADER](context, leader) {
    return new Promise((resolve, reject) => {
      liderancasService
        .updateLeader(leader)
        .then(data => {
          context.commit(SET_AUTH, data);
          resolve();
        })
        .catch(error => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  },
  [GET_NEAR_MEMBERS](context, info) {
    return new Promise((resolve, reject) => {
      liderancasService
        .nearMembers(info)
        .then(data => {
          console.info("Membros próximos: " + data);
          // context.commit(SET_VOTERS, data);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          reject(error);
        });
    });
  },
  [GET_UNVISITED_MEMBERS](context, info) {
    return new Promise((resolve, reject) => {
      liderancasService
        .unvisitedMembers(info)
        .then(data => {
          console.info("Membros próximos não visitados: " + data);
          // context.commit(SET_VOTERS, data);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          reject(error);
        });
    });
  },
  [GET_VOTERS](context, leader_id) {
    return new Promise((resolve, reject) => {
      liderancasService
        .voters(leader_id)
        .then(data => {
          console.info("Voters: " + data);
          context.commit(SET_VOTERS, data);
          resolve();
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          reject(error);
        });
    });
  },
  [ADD_VOTER](context, voter) {
    return new Promise((resolve, reject) => {
      liderancasService
        .addVoter({ member: voter })
        .then(data => {
          // context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  },
  [UPDATE_VOTER](context, voter) {
    return new Promise((resolve, reject) => {
      liderancasService
        .updateVoter({ member: voter })
        .then(data => {
          // context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  },
  [UPDATE_VISIT](context, visit) {
    return new Promise((resolve, reject) => {
      liderancasService
        .updateVisit(visit)
        .then(data => {
          // context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  },
  [ADD_VISIT](context, visit) {
    return new Promise((resolve, reject) => {
      liderancasService
        .addVisit(visit)
        .then(data => {
          // context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  },
  [GET_VISITS](context, voter_id) {
    return new Promise((resolve, reject) => {
      liderancasService
        .visits(voter_id)
        .then(data => {
          console.info("Visits: " + data.collection);
          // context.commit(SET_VISITS, data);
          resolve(data.collection);
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          reject(error);
        });
    });
  },
  [GET_CITES](context, description) {
    return new Promise((resolve, reject) => {
      liderancasService
        .getCities(description)
        .then(data => {
          console.info("Cidades: " + data.collection);
          // context.commit(SET_VOTERS, data);
          resolve(data.collection);
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          reject(error);
        });
    });
  },
  [FIND_ZIPCODE](context, zipcode) {
    return new Promise((resolve, reject) => {
      liderancasService
        .findByZipcode(zipcode)
        .then(data => {
          console.info("Cidade: " + data.response);
          // context.commit(SET_VOTERS, data);
          resolve(data.response);
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          reject(error);
        });
    });
  },
  [FIND_CITY_IBGE](context, ibge) {
    return new Promise((resolve, reject) => {
      liderancasService
        .findCityByIbge(ibge)
        .then(data => {
          console.info("Cidade: " + data);
          // context.commit(SET_VOTERS, data);
          resolve(data);
        })
        .catch(error => {
          context.commit(SET_ERROR, response.data.errors);
          reject(error);
        });
    });
  }
};

const mutations = {
  [SET_NOTIFICATION](state, notification) {
    liderancasService.notification = notification;
  },
  [SET_INITIAL](state, initial) {
    liderancasService.initial = initial;
  },
  [SET_NOTIFICATIONS](state, notifications) {
    state.notifications = notifications;
  },
  [SET_VOTERS](state, voters) {
    state.voters = voters;
  },
  [SET_VISITS](state, visits) {
    state.visits = visits;
  }
};
// export this module.
export default {
  state,
  mutations,
  actions,
  getters
};
