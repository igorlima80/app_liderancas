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
      <Label class="action-bar-title" text="Notificações"></Label>
    </ActionBar>

    <GridLayout class="page-content">
      <ScrollView>
        <ListView for="notification in notifications" @itemTap="onItemTap">
          <v-template>
            <notification
              :title="notification.title"
              :description="notification.description"
              :time="notification.time"
              :type="notification.type"
            />
          </v-template>
        </ListView>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import SelectedPageService from "../shared/selected-page-service";
import Notification from "~/components/Notification";
import { GET_NOTIFICATIONS } from "~/store/actions.type";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Notifications");
  },
  created() {
    this.$store
      .dispatch(GET_NOTIFICATIONS)
      .then(() => {})
      .catch(error => {});
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    },
    ...mapGetters(["notifications"])
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onItemTap() {}
  },
  components: {
    Notification
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../assets/scss/app-variables";
// End custom common variables

// Custom styles
.page-content{
  padding: 20;
}
</style>