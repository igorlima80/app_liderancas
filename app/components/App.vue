<template lang="html">
  <RadSideDrawer ref="drawer" drawerLocation="Left" :drawerTransition="transition">
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <slot name="drawerContent"></slot>
    </StackLayout>
    <Navigator :defaultRoute="isLoggedIn() ? '/home' : '/login'" ~mainContent ref="drawerMainContent" >
      <slot name="mainContent"></slot>
    </Navigator>
  </RadSideDrawer>
</template>

<script>
import * as utils from "~/shared/utils";
import { mapGetters } from "vuex";
import LoginService from "~/services/LoginService";
import { FETCH_USER } from "~/store/actions.type";
import { SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
const loginService = new LoginService();

export default {
  data() {
    return {
      transition: new SlideInOnTopTransition()
    };
  },
  methods: {
    isLoggedIn() {
      return loginService.isLoggedIn();
    }
  },
  computed: { ...mapGetters(["user"]) },
  created() {   
    if (!loginService.isLoggedIn()) {
      if (getConnectionType() === connectionType.none) {
        alert({
          title: "Lideranças",
          message:
            "Não foi possivei carregar os dados do usuário. Sem conexão com a internet. Tente mais tarde.",
          okButtonText: "OK"
        });
        this.$navigator.navigate("/login", {
          clearHistory: true
        });
      }
      return;
    }

    this.$store
      .dispatch(FETCH_USER, loginService.token)
      .then(() => {})
      .catch(error => {
        alert({
          title: "Lideranças",
          message:
            "Não foi possivei carregar os dados do usuário. Tente mais tarde.",
          okButtonText: "OK"
        });
        this.$navigator.navigate("/login", {
          clearHistory: true
        });
        return;
      });

    // this.$store
    //   .dispatch(GET_NOTIFICATIONS)
    //   .then(() => {})
    //   .catch(error => {});
  }
};
</script>

<style lang="css">
</style>
