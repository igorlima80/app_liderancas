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
      <Label class="action-bar-title" text="Adicionar Visita"></Label>
    </ActionBar>
    <GridLayout rows="*,auto" columns="*,*">
      <ScrollView col="0" row="0" colSpan="2">
        <GridLayout class="page-content" rows="auto,auto,auto,auto" columns="*,*">
          <Label
            row="0"
            col="0"
            text="Visita"
            colSpan="2"
            class="font-weight-bold text-primary m-b-20"
          />
          <StackLayout class="input-field" row="1" colSpan="2">
            <Label text="Data" class="label" />
            <DatePickerField
              @dateChange="onDateTimeChange1"
              dateFormat="yyyy-MM-dd"
            ></DatePickerField>
          </StackLayout>
          <StackLayout class="input-field" row="2" colSpan="2">
            <Label text="N° de familiares" class="label" />
            <TextField
              ref="nfamily"
              keyboardType="number"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="visit.number_of_voters"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="3" colSpan="2">
            <Label text="Observação" class="label" />
            <TextView
              ref="observation"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="visit.observation"
              returnKeyType="done"
            />
          </StackLayout>
        </GridLayout>
      </ScrollView>
      <GridLayout col="0" row="1" colSpan="2" rows="auto" columns="*,*">
        <Button row="0" col="0" text="Cancelar" @tap="$navigator.back()" class="btn btn-secondary" />
        <Button row="0" col="1" text="Salvar" @tap="addVisit" class="btn btn-primary" />
      </GridLayout>
    </GridLayout>

    <!-- <RadDataForm
        ref="dataForm"
        :source="voter"
        :metadata="userMetadata"
        :groups="groups"
        :isReadOnly="isReadOnly"
        row="0"
        col="0"
        colSpan="2"
      ></RadDataForm> -->
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import SelectedPageService from "../shared/selected-page-service";
import { Feedback } from "nativescript-feedback";
import { ADD_VISIT } from "~/store/actions.type";
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
const feedback = new Feedback();

export default {
  props: ["member"],
  data() {
    return {
      visit: {
        date_visit: "",
        observation: "",
        number_of_voters: null,
        member_id: null
      }
    };
  },
  methods: {
    addVisit() {
      if (getConnectionType() === connectionType.none) {
        feedback.error({
          message:
            "Lideranças requer uma conexão com a Internet para atualizar o eleitor."
        });
        return;
      }

      if (!this.visit.date_visit || !this.visit.number_of_voters || !this.visit.observation) {
        feedback.error({
          message: "Por favor, digite todos os campos para cadastrar."
        });
        return;
      }

      utils.loader.show();
      this.visit.member_id = this.member.id;
      // this.visit.date_visit = this.$refs.date_visit.nativeView.text
      this.$store
        .dispatch(ADD_VISIT, this.visit)
        .then(() => {
          this.$navigator.navigate("/visit", { props: { member: this.member }},{clearHistory: true})
          utils.loader.hide();
          feedback.success({
            message: "Visita adicionada com sucesso."
          });
        })
        .catch(error => {
          console.error(error);
          utils.loader.hide();
          feedback.error({
            message: "Infelizmente não conseguimos adicionar. Tente mais tarde."
          });
        });
    },
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onDateTimeChange1(args) {
      this.visit.date_visit = args.value;
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

.disabled {
  opacity: 0.5;
}

.page-content {
  padding: 15 15 0 15;
}
</style>