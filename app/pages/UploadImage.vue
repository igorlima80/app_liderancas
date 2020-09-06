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
      <Label class="action-bar-title" text="Modificar Avatar"></Label>
    </ActionBar>

    <GridLayout rows="auto,*,auto" columns="*,*" class="m-15">
      <MDCardView row="0" col="0" class="btn btn-primary" @tap="takePicture">
        <StackLayout class="m-10">
          <Label class="fas icon-action" :text="'fa-camera-retro' | fonticon"/>
          <Label class="text-center font-weight-bold" text="Tirar uma foto" textWrap="true"/>
        </StackLayout>
      </MDCardView>
      <MDCardView row="0" col="1" class="btn btn-primary" @tap="uploadPicture">
        <StackLayout class="m-10">
          <Label class="fas icon-action" :text="'fa-images' | fonticon"/>
          <Label class="text-center font-weight-bold" text="Carregar do arquivo" textWrap="true"/>
        </StackLayout>
      </MDCardView>
      <Image ref="cameraImage" stretch="none" row="1" col="0" colSpan="2" loadMode="async" class="preview"/>
      <Button
        row="2"
        colSpan="2"
        col="0"
        text="Enviar imagem"
        class="btn btn-primary"
        @tap="updateAvatar"
      />
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import * as camera from "nativescript-camera";
const imageSourceModule = require("tns-core-modules/image-source");
import * as imagepicker from "nativescript-imagepicker";
let ImageCropper = require("nativescript-imagecropper").ImageCropper;
import SelectedPageService from "../shared/selected-page-service";
import { LOGOUT } from "~/store/actions.type";
import { Feedback } from "nativescript-feedback";
const feedback = new Feedback();

export default {
  props: ["user","role"],
  data() {
    return {
      isSingleMode: true,
      imageAssets: [],
      imageWidth: 500,
      imageHeight: 500
    };
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    takePicture() {
      let self = this;
      if (camera.isAvailable()) {
        camera.requestPermissions().then(
          function success() {
            // permission request accepted or already granted
            camera
              .takePicture({
                saveToGallery: false,
                width: self.imageWidth,
                height: self.imageHeight,
                keepAspectRatio: true
              })
              .then(imageAsset => {
                let source = new imageSourceModule.ImageSource();
                source.fromAsset(imageAsset).then(source => {
                  self.editPicture(source);
                });
              })
              .catch(err => {
                console.log("Error -> " + err.message);
              });
          },
          function failure() {
            alert("Sem permissão para acessar a camera!");
          }
        );
      } else {
        alert("O dispositivo não possui camera!");
      }
    },
    uploadPicture() {
      this.isSingleMode = true;
      let context = imagepicker.create({ mode: "single", mediaType: "Image" });
      this.startSelection(context);
    },
    editPicture(imageSource) {
      let imageCropper = new ImageCropper();
      imageCropper
        .show(imageSource, { width: 500, height: 500 })
        .then(args => {
          console.dir(args);
          if (args.image !== null) {
            this.setImageAsset(args.image);
          }
        })
        .catch(function(e) {
          console.dir(e);
        });
    },
    startSelection(context) {
      let self = this;
      context
        .authorize()
        .then(() => {
          this.imageAssets = [];
          return context.present();
        })
        .then(selection => {
          console.log("Selection done: " + JSON.stringify(selection[0]));
          selection.forEach(function(selected) {
            let source = new imageSourceModule.ImageSource();
            source.fromAsset(selected).then(source => {
              self.editPicture(source);
            });
          });
        });
    },
    updateAvatar() {},
    setImageAsset(imageAsset) {
      this.$refs.cameraImage.nativeView.src = imageAsset;
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../assets/scss/app-variables";
// End custom common variables

// Custom styles
.preview {
  border-radius: 100%;
  horizontal-align: center;
  vertical-align: center;
}

.icon-action {
  font-size: 38px;
  text-align: center;
}
</style>