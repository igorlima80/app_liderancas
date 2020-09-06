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
      <Label class="action-bar-title" text="Registro de Visitas"></Label>
    </ActionBar>

    <GridLayout rows="auto,auto,*">
      <MDCardView
        rippleColor="transparent"
        elevation="2"
        class="list-group"
        row="0"
      >
        <GridLayout rows="auto, auto" columns="auto, *, auto" class="list-group-item">
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
          <!-- <Label row="0" col="1" :text="voter.name" class="list-group-item-heading font-weight-bold" /> -->
          <Label
            row="0"
            col="1"
            :text="member.name"
            class="list-group-item-heading"
          />
          <Label
            row="1"
            col="1"
            :text="member.cpf"
            class="list-group-item-text"
          />
          <Label
            row="0"
            col="2"
            rowSpan="2"
            :text="'fa-shoe-prints' | fonticon"
            class="fas text-right"
            :class="{ visited: member.status == 'visited' }"
          />
        </GridLayout>
      </MDCardView>
      <Label
        text="Visitas realizadas"
        class="font-weight-bold text-primary m-t-20 m-l-15"
        row="1"
      />
      <ActivityIndicator
        class="indicator"
        row="2"
        v-if="visitIndicator"
        :busy="visitIndicator"
      />
      <RadListView
        v-else
        row="2"
        class="list-group page-content"
        ref="listView"
        for="visit in visits"
        pullToRefresh="true"
        @pullToRefreshInitiated="onPullToRefreshInitiated"
      >
        <v-template>
          <GridLayout class="list-group-item" rows="auto, *" columns="*">
            <Label
              row="0"
              col="0"
              :text="visit.observation"
              class="list-group-item-heading"
              @tap="onItemTap(visit)"
            />
            <Label
              row="1"
              col="0"
              :text="visit.date_visit"
              class="list-group-item-text"
              @tap="onItemTap(visit)"
            />
          </GridLayout>
        </v-template>
      </RadListView>
      <MDFloatingActionButton
        row="2"
        rippleColor="green"
        elevation="7"
        class="btn btn-primary f-btn"
        src="res://baseline_add_white_24"
        @tap="addVisit"
      />
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
// import {
//   GroupTitleStyle,
//   PropertyGroup,
//   DataFormFontStyle
// } from "nativescript-ui-dataform";
// import { Color } from "tns-core-modules/color";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import SelectedPageService from "../shared/selected-page-service";
import { Feedback } from "nativescript-feedback";
import { GET_VISITS } from "~/store/actions.type";
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
const feedback = new Feedback();

export default {
  props: ["member"],
  data() {
    return {
      visitIndicator: true,
      visits: [],
      listVisits: new ObservableArray(this.visits)
    };
  },
  created() {
    console.log("id de membro:" + this.member.id);
    this.$store
      .dispatch(GET_VISITS, this.member.id)
      .then(data => {
        this.visits = data;
        this.visitIndicator = false;
      })
      .catch(error => {});
  },
  methods: {
    onPullToRefreshInitiated({ object }) {
      console.log("Pulling...");
      // in order to avoid race conditions (only on iOS),
      // in which the UI may not be completely updated here
      // we use this.$nextTick call
      this.$nextTick(() => {
        this.$store
          .dispatch(GET_VISITS, this.member.id)
          .then(data => {
            this.visits = data;
          })
          .catch(error => {});
        object.notifyPullToRefreshFinished();
      });
    },
    onItemTap(visit) {
      // const m = clone(this.member);
      // this.$navigator.navigate("/addvisit", { props: { member: m }})
    },
    addVisit() {
      // const m = clone(this.member);
      this.$navigator.navigate("/addvisit", { props: { member: this.member } });
    },
    // updateVisit() {
    //   if (getConnectionType() === connectionType.none) {
    //     feedback.error({
    //       message:
    //         "Lideranças requer uma conexão com a Internet para atualizar o eleitor."
    //     });
    //     return;
    //   }

    //   utils.loader.show();
    //   this.$store
    //     .dispatch(UPDATE_VISIT, this.visit)
    //     .then(() => {
    //       this.$navigator.back();
    //       utils.loader.hide();
    //       feedback.success({
    //         message: "Eleitor atualizado com sucesso."
    //       });
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       utils.loader.hide();
    //       feedback.error({
    //         message: "Infelizmente não conseguimos atualizar. Tente mais tarde."
    //       });
    //     });
    // },
    onDrawerButtonTap() {
      utils.showDrawer();
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../assets/scss/app-variables";
// End custom common variables

// Custom styles
.thumb {
  height: 45;
  width: 45;
  border-radius: 50%;
}

.page-content {
  padding: 15 15 0 15;
}

.visited {
  color: $warning-light;
}

.f-btn {
  horizontal-align: right;
  vertical-align: bottom;
}
</style>
