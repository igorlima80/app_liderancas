<template>
  <Page class="page" @loaded="pageLoaded()" @unloaded="pageUnLoaded()">
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
      <Label class="action-bar-title" text="Início"></Label>
    </ActionBar>
    <GridLayout rows="auto,auto,*,auto,*">
      <MDCardView rippleColor="transparent" elevation="2" class="list-group" row="0">
        <ActivityIndicator class="indicator" v-if="userIndicator" :busy="userIndicator" />
        <GridLayout v-else rows="auto, auto" columns="auto, *" class="list-group-item">
          <!-- <Image
            v-if="user.image"
            :src="user.image"
            row="0"
            col="0"
            class="thumb img-circle"
            rowSpan="2"
          />-->
          <Image
            src="~/assets/images/userimage.png"
            row="0"
            col="0"
            class="thumb img-circle"
            rowSpan="2"
          />
          <Label row="0" col="1" text="Olá," class="list-group-item-heading font-weight-bold" />
          <Label row="1" col="1" :text="user.user.name" class="list-group-item-heading" />
          <!-- <Label row="1" col="1" :text="user.user.email" class="list-group-item-text" /> -->
        </GridLayout>
      </MDCardView>
      <Label text="Membros  próximos" class="font-weight-bold text-primary m-t-20 m-l-15" row="1" />
      <ActivityIndicator
        class="indicator"
        row="2"
        v-if="nearMembersIndicator"
        :busy="nearMembersIndicator"
      />
      <Label row="2" v-else-if="!near_members.success" :text="near_members.message" class="text-center text-primary warning"/>
      <Pager
        v-else
        for="member in near_members.collection"
        row="2"
        transformers="scale"
        showIndicator="true"
        spacing="1%"
        peaking="5%"
      >
        <v-template>
          <MDCardView rippleColor="transparent" elevation="2" class="m-y-30 m-x-5">
            <StackLayout class="m-20" verticalAlignment="center">
              <Label
                :text="'fa-shoe-prints' | fonticon"
                class="fas text-right"
                :class="{visited: member.status == 'visited'}"
              />
              <!-- <Image
                v-if="members.image"
                :src="members.image"
                class="thumb img-circle"
                horizontalAlignment="center"
                @tap="onmembersCardTap(members)"
              />-->
              <Image
                src="~/assets/images/userimage.png"
                class="thumb img-circle"
                horizontalAlignment="center"
                @tap="onMembersCardTap(member)"
              />
              <Label
                class="text-center font-weight-bold m-t-10"
                :text="member.name"
                textWrap="true"
                @tap="onMembersCardTap(member)"
              />
              <Label
                textWrap="true"
                class="fas text-center m-t-30 p-y-5"
                @tap="openMaps(member.latitude, member.longitude)"
              >
                <FormattedString>
                  <Span :text="member.address.street" />
                  <Span text=", " />
                  <Span :text="member.address.number" />
                  <Span text=", " />
                  <Span :text="member.address.district" />
                  <Span text="  " />
                  <Span :text="'fa-map-marker-alt' | fonticon" style="color: #D84039" />
                </FormattedString>
              </Label>
            </StackLayout>
          </MDCardView>
        </v-template>
      </Pager>
      <!-- <Label
        v-else
        text="Não foi encontrado membros próximos!"
        class="font-weight-bold text-primary m-l-15"
        row="2"
      /> -->
      <Label
        text="Membros próximos não visitados"
        class="font-weight-bold text-primary m-l-15"
        row="3"
      />
      <ActivityIndicator
        class="indicator"
        row="4"
        v-if="nearUnvisitedIndicator"
        :busy="nearUnvisitedIndicator"
      />
      <Label row="4" v-else-if="!unvisited_members.success" :text="unvisited_members.message" class="text-center text-primary warning"/>
      <Pager
        v-else
        for="member in unvisited_members.collection"
        row="4"
        transformers="scale"
        showIndicator="true"
        spacing="1%"
        peaking="5%"
      >
        <v-template>
          
          <MDCardView rippleColor="transparent" elevation="2" class="m-y-30 m-x-5">
            <StackLayout class="m-20" verticalAlignment="center">
              <Label
                :text="'fa-shoe-prints' | fonticon"
                class="fas text-right"
                :class="{visited: member.status == 'visited'}"
              />
              <!-- <Image
                v-if="member.image"
                :src="member.image"
                class="thumb img-circle"
                horizontalAlignment="center"
                @tap="onNearmemberCardTap(member)"
              />-->
              <Image
                src="~/assets/images/userimage.png"
                class="thumb img-circle"
                horizontalAlignment="center"
                @tap="onUnvisitedMemberCardTap(member)"
              />
              <Label
                class="text-center font-weight-bold m-t-10"
                :text="member.name"
                textWrap="true"
                @tap="onUnvisitedMemberCardTap(member)"
              />
              <Label
                textWrap="true"
                class="fas text-center m-t-30 p-y-5"
                @tap="openMaps(member.latitude, member.longitude)"
              >
                <FormattedString>
                  <Span :text="member.address.street" />
                  <Span text=", " />
                  <Span :text="member.address.number" />
                  <Span text=", " />
                  <Span :text="member.address.district" />
                  <Span text="  " />
                  <Span :text="'fa-map-marker-alt' | fonticon" style="color: #D84039" />
                </FormattedString>
              </Label>
            </StackLayout>
          </MDCardView>
        </v-template>
      </Pager>
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { mapGetters } from "vuex";
import LoginService from "~/services/LoginService";
import SelectedPageService from "../shared/selected-page-service";
import orientationModule from "nativescript-screen-orientation";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import {
  FETCH_USER,
  GET_NEAR_MEMBERS,
  GET_UNVISITED_MEMBERS
} from "~/store/actions.type";
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
const loginService = new LoginService();

export default {
  data() {
    return {
      nearMembersIndicator: true,
      nearUnvisitedIndicator: true,
      userIndicator: true,
      near_members: {},
      near_members_empty: true,
      unvisited_members: {},
      unvisited_members_empty: true,
      location: {}
    };
  },
  created() {
    this.$store
      .dispatch(FETCH_USER, loginService.token)
      .then(() => {
        this.userIndicator = false;
      })
      .catch(error => {
        alert({
          title: "lideranças",
          message:
            "Não foi possivei carregar os dados do usuário.Tente mais tarde.",
          okButtonText: "OK"
        });
        this.$navigator.navigate("/login", {
          clearHistory: true
        });
        return;
      });

    this.enableLocation();

    // if (this.location) {
    //   this.getAllNearMembers()
    // } else {
    //   alert({
    //     title: "lideranças",
    //     message: "Não foi possivel localizar os membros mais próximos.",
    //     okButtonText: "OK"
    //   });
    // }
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
  },
  computed: { ...mapGetters(["user"]) },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    pageLoaded() {
      orientationModule.setCurrentOrientation("portrait");
      utils.gesturesEnabled(true);
    },
    pageUnLoaded() {
      orientationModule.orientationCleanup();
    },
    openMaps(latitude, longitude) {
      utils.openMaps(latitude, longitude);
    },
    onMembersCardTap(member) {
      this.$navigator.navigate("/visit", { props: { member: member } });
    },
    onUnvisitedMemberCardTap(member) {
      this.$navigator.navigate("/visit", { props: { member: member } });
    },
    getAllNearMembers() {
      const loc = {
        id: loginService.token,
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        radius: 3
      };
      this.$store
        .dispatch(GET_NEAR_MEMBERS, loc)
        .then(data => {
          this.nearMembersIndicator = false;
          this.near_members = data;
          this.near_members_empty = false;
        })
        .catch(error => {});

      this.$store
        .dispatch(GET_UNVISITED_MEMBERS, loc)
        .then(data => {
          this.nearUnvisitedIndicator = false;
          this.unvisited_members = data;
          this.unvisited_members_empty = false;
        })
        .catch(error => {});
    },
    enableLocation() {
      let that = this;
      geolocation.isEnabled().then(
        function(isEnabled) {
          if (!isEnabled) {
            geolocation
              .enableLocationRequest(true, true)
              .then(
                () => {
                  console.log("User Enabled Location Service");
                  that.getLocation();
                },
                e => {
                  console.log("Error: " + (e.message || e));
                  alert({
                    title: "Lideranças",
                    message:
                      "Lideranças precisa de permisão de Localização par emcontrar os menbros proximos.",
                    okButtonText: "OK"
                  });
                }
              )
              .catch(ex => {
                console.log("Unable to Enable Location", ex);
              });
          } else {
            that.getLocation();
          }
        },
        function(e) {
          console.log("Error: " + (e.message || e));
        }
      );
    },
    getLocation() {
      let that = this;
      geolocation
        .getCurrentLocation({
          desiredAccuracy: Accuracy.high,
          maximumAge: 5000,
          timeout: 10000
        })
        .then(
          function(loc) {
            if (loc) {
              that.location = loc;
              console.log(loc.latitude);
              console.log(loc.longitude);
              that.getAllNearMembers()
            }
          },
          function(e) {
            console.log("Error: " + (e.message || e));
            alert({
              title: "lideranças",
              message: "Não foi possivel localizar os membros mais próximos.",
              okButtonText: "OK"
            });
          }
        );
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../assets/scss/app-variables";
// End custom common variables

// Custom styles
.fas {
  font-size: 18;
}

.icon-action {
  font-size: 38px;
  text-align: center;
}

.visited {
  color: $warning-light;
}
.thumb {
  height: 70;
  width: 70;
  border-radius: 50%;
}
.page {
  background-color: $background-light;
}

.warning{
  vertical-align: center;
}
</style>