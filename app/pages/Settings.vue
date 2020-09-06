<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
      -->
      <NavigationButton
        ios:visibility="collapsed"
        icon="res://baseline_menu_white_24"
        @tap="onDrawerButtonTap"
      ></NavigationButton>
      <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
      -->
      <ActionItem
        icon="res://navigation/menu"
        android:visibility="collapsed"
        @tap="onDrawerButtonTap"
        ios.position="left"
      ></ActionItem>
      <Label class="action-bar-title" text="Configurações"></Label>
    </ActionBar>

    <GridLayout class="page-content">
      <ScrollView>
        <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto" columns="*, auto">
          <Label row="0" col="0" text="Gerais" class="font-weight-bold text-primary m-b-20" />
          <Label row="1" col="0" text="Notificações" class="font-weight-bold" color="black" />
          <Switch row="1" col="1" rowSpan="2" v-model="notifyEnabled" />
          <Label row="2" col="0" text="Ativar ou desativar as notificações do app" />
          <StackLayout row="3" col="0" colSpan="2" class="hr-light m-t-20"></StackLayout>
          <Label row="4" col="0" text="Conta" class="font-weight-bold text-primary m-t-20" />
          <!-- <GridLayout row="5" col="0" colSpan="2" rows="auto,auto,auto" columns="*, auto" @tap="$navigator.navigate('/upload-image')">
          <Image
            v-if="user.image"
            row="0"
            col="1"
            :src="user.image"
            class="thumb"
            rowSpan="3"
          />
          <Image
            v-else
            row="0"
            col="1"
            src="~/assets/images/userimage.png"
            class="thumb"
            rowSpan="3"
          />
          <Label row="1" col="0" text="Avatar" class="font-weight-bold " color="black" />
          <Label row="2" col="0" text="Modifique o seu avatar" />
          </GridLayout> -->
          <StackLayout row="5" col="0" @tap="$navigator.navigate('/user-update', { props: { user: user, role: 'leader' }})">
          <Label text="Atualizar cadastro" class="font-weight-bold m-t-20" color="black" />
          <Label text="Atualize seus dados pessoais" />
          </StackLayout>
          <StackLayout row="6" col="0" @tap="logout">
          <Label text="Sair" class="font-weight-bold m-t-20" color="black" />
          <Label text="Sair do aplicativo" />
          </StackLayout>
        </GridLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { mapGetters } from "vuex";
import SelectedPageService from "../shared/selected-page-service";
import LiderancasService from "~/services/LiderancasService";
import { CHANGE_NOTIFICATION, LOGOUT } from "~/store/actions.type";
import { Feedback } from "nativescript-feedback";
const liderancasService = new LiderancasService();
const feedback = new Feedback();

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Settings");
  },
  computed: {
    ...mapGetters(["user"]),
    notifyEnabled: {
      // getter
      get: function() {
        return liderancasService.notification;
      },
      // setter
      set: function(newValue) {
        this.$store.dispatch(CHANGE_NOTIFICATION, newValue);
      }
    }
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    logout() {
      confirm({
        title: "Sair",
        message: "Você realmente deseja sair do Lideranças?",
        okButtonText: "Sair",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result) {
          utils.loader.show();
          this.$store.dispatch(LOGOUT);
          this.$navigator.navigate("/login", {
            clearHistory: true
          });
          utils.loader.hide();
          feedback.success({
            message: "Você foi deslogado com sucesso."
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../assets/scss/app-variables";
// End custom common variables
// Drawer navigation custom styles
.thumb{
  height: 50;
  width: 50;
  border-radius: 50%;
}
.page-content{
  padding: 20;
}
</style>