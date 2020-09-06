<template lang="html">
<GridLayout rows="auto, *" class="sidedrawer sidedrawer-left">
            <StackLayout row="0" class="sidedrawer-header">
                <!-- <Image v-if="user.image" :src="user.image" class="sidedrawer-header-image"></Image> -->
                <Image src="~/assets/images/userimage.png" class="sidedrawer-header-image"></Image>
                <Label class="sidedrawer-header-brand" :text="user.user.name"></Label>
                <Label class="footnote" :text="user.cpf"></Label>
            </StackLayout>
        
            <ScrollView row="1" class="sidedrawer-content">
                <StackLayout>
                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Home' ? ' selected': '')" @tap="onNavigationItemTap('/home')">
                        <Label col="0" :text="'fa-home' | fonticon" class="fas"></Label>
                        <Label col="1" text="Início" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Voters' ? ' selected': '')" @tap="onNavigationItemTap('/voters')">
                        <Label col="0" :text="'fa-users' | fonticon" class="fas"></Label>
                        <Label col="1" text="Membros" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Visits' ? ' selected': '')" @tap="onNavigationItemTap('/visits')">
                        <Label col="0" :text="'fa-map-marked-alt' | fonticon" class="fas"></Label>
                        <Label col="1" text="Visitas" class="p-r-10"></Label>
                    </GridLayout>

                    <!-- <GridLayout columns="auto, *, auto" :class="'sidedrawer-list-item' + (selectedPage === 'Notifications' ? ' selected': '')" @tap="onNavigationItemTap('/notifications')">
                        <Label col="0" :text="'fa-bell' | fonticon" class="fas"></Label>
                        <Label col="1" text="Notificações" class="p-r-10"></Label>
                        <badge :badgeValue="notifications_quant" col="2"/>
                    </GridLayout> -->
        
                    <StackLayout class="hr-light"></StackLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Settings' ? ' selected': '')" @tap="onNavigationItemTap('/settings')">
                        <Label col="0" :text="'fa-cog' | fonticon" class="fas"></Label>
                        <Label col="1" text="Configurações" class="p-r-10"></Label>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </GridLayout>
</template>

<script>
import * as utils from "~/shared/utils";
// import Badge from "~/components/Badge";
import SelectedPageService from "~/shared/selected-page-service";
import { mapGetters } from "vuex";

export default {
  // components: {
  //   Badge
  // },
  mounted() {
    SelectedPageService.getInstance().selectedPage$.subscribe(
      selectedPage => (this.selectedPage = selectedPage)
    );
  },
  data() {
    return {
      selectedPage: ""
    };
  },
  computed: { ...mapGetters(["user"]) },
  methods: {
    onNavigationItemTap(path) {
      this.$navigator.navigate(path, {
        clearHistory: true,
        animated: true,
        transition: {
          name: "fade",
          duration: 500,
          curve: "ease"
        }
      });
      utils.closeDrawer();
    }
  }
};
</script>

<style scoped lang="scss">
// Custom common variables
@import "../assets/scss/app-variables";

// Drawer navigation custom styles
$sidedrawer-header-image-size: 60;
$sidedrawer-header-image-offset-top: 20;
$sidedrawer-header-image-offset-bottom: 5;
$sidedrawer-list-item-offset-left: 15;
$sidedrawer-list-icon-offset: 10;
$sidedrawer-list-icon-size: 20;
.sidedrawer {
  &.sidedrawer-left {
    background-color: $ab-background;

    .sidedrawer-header-image {
      color: $background-dark;
      // background-color: $background-dark;
      height: $sidedrawer-header-image-size;
      width: $sidedrawer-header-image-size; 
      font-size: $sidedrawer-header-image-size;
      padding: 0;
      margin-bottom: $sidedrawer-header-image-offset-bottom;
      margin-top: $sidedrawer-header-image-offset-top;
    }

    .footnote {
      color: rgba($ab-color, 0.5);
    }
  }

  .sidedrawer-header {
    background-color: $ab-background;

    .sidedrawer-header-brand {
      color: $ab-color;
    }
  }

  .sidedrawer-content {
    background-color: $side-drawer-background;
  }

  .sidedrawer-list-item {
    padding-left: $sidedrawer-list-item-offset-left;

    label {
      vertical-align: center;
      color: $blue-dark;
    }

    .fas {
      width: $sidedrawer-list-icon-size;
      margin-right: $sidedrawer-list-icon-offset;
    }

    &.selected {
      background-color: $item-active-background;

      label {
        color: $item-active-color;
      }
    }
  }
}
</style>