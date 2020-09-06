<template>
  <Page class="page" @loaded="onLoaded">
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
      <Label class="action-bar-title" text="Atualizar Cadastro"></Label>
    </ActionBar>

    <GridLayout rows="*,auto" columns="*,*">
      <ScrollView col="0" row="0" colSpan="2">
        <GridLayout
          class="page-content"
          rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto"
          columns="*,*"
        >
          <Label
            row="0"
            col="0"
            text="Dados Gerais"
            colSpan="2"
            class="font-weight-bold text-primary m-b-20"
          />
          <StackLayout class="input-field" row="1" colSpan="2">
            <Label text="Nome" class="label" />
            <TextField
              isEnabled="false"
              ref="name"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="leader.user.name"
              returnKeyType="next"
            />
          </StackLayout>
          <!-- <StackLayout class="input-field" row="2" colSpan="2">
        <Label text="Email" class="label" />
        <TextField
        ref="email"
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        v-model="leader.email"
        returnKeyType="next"
      /> 
      </StackLayout> -->
          <StackLayout class="input-field" row="3" colSpan="2">
            <Label text="CPF" class="label" />
            <MaskedTextField
              isEnabled="false"
              ref="cpf"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              :text="leader.cpf"
              returnKeyType="next"
              mask="000.000.000-00"
            />
          </StackLayout>
          <Label
            row="4"
            col="0"
            text="Endereço"
            colSpan="2"
            class="font-weight-bold text-primary m-y-20"
          />
          <StackLayout class="input-field" row="5" colSpan="2">
            <Label text="Descrição" class="label" />
            <TextField
              ref="description"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="leader.address.description"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="6" colSpan="2">
            <Label text="CEP*" class="label" />
            <MaskedTextField
              ref="zipcode"
              @blur="onBlur"
              keyboardType="number"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="leader.address.zipcode"
              returnKeyType="next"
              mask="00000-000"
            />
          </StackLayout>
          <StackLayout class="input-field" row="7" colSpan="2">
            <Label text="Logradouro*" class="label" />
            <TextField
              ref="street"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="leader.address.street"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="8" colSpan="2">
            <Label text="Complemento" class="label" />
            <TextField
              ref="complement"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="leader.address.complement"
              returnKeyType="next"
            />
          </StackLayout>

          <StackLayout class="input-field" row="9" colSpan="2">
            <Label text="Bairro*" class="label" />
            <TextField
              ref="district"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="leader.address.district"
              returnKeyType="next"
            />
          </StackLayout>

          <StackLayout class="input-field" row="10" colSpan="2">
            <Label text="Número*" class="label" />
            <TextField
              ref="number"
              keyboardType="number"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="leader.address.number"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="11" colSpan="2">
            <Label text="Cidade*" class="label" />
            <RadAutoCompleteTextView
              ref="autocomplete"
              completionMode="Contains"
              @didAutoComplete="onDidAutoComplete"
              :items="dataItems"
              keyboardType="text"
              autocorrect="false"
              returnKeyType="done"
            >
              <SuggestionView ~suggestionView suggestionViewHeight="300">
                <StackLayout
                  v-suggestionItemTemplate
                  orientation="vertical"
                  padding="10"
                >
                  <v-template>
                    <Label :text="item.text"></Label>
                  </v-template>
                </StackLayout>
              </SuggestionView>
            </RadAutoCompleteTextView>
          </StackLayout>
          <!-- <RadDataFormMaskedTextField
        @loaded="onLoadMaskedTextField
        ref="dataForm"
        :source="leader"
        :metadata="userMetadata"
        :groups="groups"
        row="0"
        col="0"
        colSpan="2"
      ></RadDataForm> -->
        </GridLayout>
      </ScrollView>
      <GridLayout col="0" row="1" colSpan="2" rows="auto" columns="*,*">
        <Button
          row="0"
          col="0"
          text="Cancelar"
          @tap="$navigator.back()"
          class="btn btn-secondary"
        />
        <Button
          row="0"
          col="1"
          text="Salvar"
          @tap="updateUser"
          class="btn btn-primary"
        />
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import { mapGetters } from "vuex";
import * as utils from "~/shared/utils";
import LoginService from "~/services/LoginService";
// import {
//   GroupTitleStyle,
//   PropertyGroup,
//   DataFormFontStyle
// } from "nativescript-ui-dataform";
// import { Color } from "tns-core-modules/color";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import SelectedPageService from "../shared/selected-page-service";
import { Feedback } from "nativescript-feedback";
import {
  FETCH_USER,
  UPDATE_LEADER,
  GET_CITES,
  FIND_ZIPCODE,
  FIND_CITY_IBGE
} from "~/store/actions.type";
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
const feedback = new Feedback();
let clone = require("clone");
const loginService = new LoginService();

export default {
  data() {
    return {
      leader: { address: {}, user: {} },
      dataItems: new ObservableArray()
      // groups: [],
      // userMetadata: {
      //   isReadOnly: false,
      //   commitMode: "Immediate",
      //   validationMode: "Immediate",
      //   propertyAnnotations: [
      //     {
      //       name: "authtoken",
      //       hidden: true
      //     },
      //     {
      //       name: "id",
      //       hidden: true
      //     },
      //     {
      //       name: "image",
      //       hidden: true
      //     },
      //     {
      //       name: "latitude",
      //       hidden: true
      //     },
      //     {
      //       name: "longitude",
      //       hidden: true
      //     },
      //     {
      //       groupName: "Dados Pessoais",
      //       name: "user.name",
      //       displayName: "Nome",
      //       index: 0,
      //       editor: "Text"
      //     },
      //     {
      //       groupName: "Dados Pessoais",
      //       name: "email",
      //       displayName: "Email",
      //       readOnly: true,
      //       index: 1,
      //       editor: "Email"
      //     },
      //     {
      //       groupName: "Dados Pessoais",
      //       name: "phone",
      //       displayName: "Celular",
      //       index: 2,
      //       editor: "Phone"
      //     },
      //     {
      //       groupName: "Endereço",
      //       name: "address",
      //       displayName: "Logradouro",
      //       index: 3,
      //       editor: "Text"
      //     },
      //     {
      //       groupName: "Endereço",
      //       name: "number",
      //       displayName: "Número",
      //       index: 4,
      //       editor: "Number"
      //     },
      //     {
      //       groupName: "Endereço",
      //       name: "neighborhood",
      //       displayName: "Bairro",
      //       index: 5,
      //       editor: "Text"
      //     },
      //     {
      //       groupName: "Endereço",
      //       name: "cep",
      //       displayName: "CEP",
      //       index: 6,
      //       editor: "Number"
      //     },
      //     {
      //       groupName: "Endereço",
      //       name: "complement",
      //       displayName: "Complemento",
      //       index: 7,
      //       editor: "Text"
      //     }
      //   ]
      // }
    };
  },
  // created() {
  //   let gts = new GroupTitleStyle();
  //   let pg = new PropertyGroup();

  //   gts.labelTextColor = new Color("#417169");
  //   gts.labelFontStyle = DataFormFontStyle.Bold;
  //   gts.labelTextSize = 14;

  //   pg.name = "Dados Pessoais";
  //   pg.collapsible = true;
  //   pg.collapsed = false;
  //   pg.titleStyle = gts;

  //   this.groups.push(pg);

  //   pg = new PropertyGroup();

  //   pg.name = "Endereço";
  //   pg.collapsible = true;
  //   pg.collapsed = false;
  //   pg.titleStyle = gts;

  //   this.groups.push(pg);
  // },
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
  },
  mounted() {
    this.$refs.autocomplete.setLoadSuggestionsAsync(text => {
      const promise = new Promise((resolve, reject) => {
        this.$store
          .dispatch(GET_CITES, text)
          .then(data => {
            const cities = data;
            const items = new Array();
            for (let i = 0; i < cities.length; i++) {
              items.push(
                new utils.CityModelToken(
                  cities[i].id,
                  cities[i].name_with_state,
                  null
                )
              );
            }
            resolve(items);
          })
          .catch(err => {
            const message = `Error fetching remote data from: ${err.message}`;
            console.log(message);
            alert(message);
            reject();
          });
      });
      return promise;
    });
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    updateUser() {
      if (getConnectionType() === connectionType.none) {
        feedback.error({
          message:
            "Lideranças requer uma conexão com a Internet para atualizar."
        });
        return;
      }
      if (
        !this.getCep() ||
        !this.leader.address.street ||
        !this.leader.address.number ||
        !this.leader.address.district ||
        !this.leader.address.city_id
      ) {
        feedback.error({
          message: "Por favor, digite os campos obrigatórios(*)."
        });
        return;
      }

      // delete this.leader.address.city;
      // utils.loader.show();
      console.dir(this.leader);
      this.$store
        .dispatch(UPDATE_LEADER, this.leader)
        .then(() => {
          this.$navigator.navigate("/settings");
          // utils.loader.hide();
          feedback.success({
            message: "Cadastro atualizado com sucesso."
          });
        })
        .catch(error => {
          console.error(error);
          // utils.loader.hide();
          feedback.error({
            message:
              "Infelizmente não conseguimos atualizar seus dados. Tente mais tarde."
          });
          // utils.loader.hide();
        });
    },
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onLoaded() {
      this.leader = clone(this.user);
      if (this.leader.address.city) {
        this.$refs.autocomplete.addToken(
          new utils.CityModelToken(
            this.leader.address.city.id,
            this.leader.address.city.name_with_state,
            null
          )
        );
        this.leader.address.city_id = this.leader.address.city.id;
      }
      if (this.leader.address.zipcode) {
        this.setCep(this.leader.address.zipcode);
      }
    },
    onDidAutoComplete({ token }) {
      this.leader.address.city.id = token.id;
      this.leader.address.city.name_with_state = token.name_with_state;
      this.leader.address.city_id = this.leader.address.city.id;
    },
    onBlur() {
      if (getConnectionType() === connectionType.none) {
        alert(
          "Lideranças requer uma conexão com a Internet para buscar o cep."
        );
        return;
      }

      utils.loader.show();
      const self = this;
      this.$store
        .dispatch(FIND_ZIPCODE, this.getCep())
        .then(data => {
          this.leader.address.zipcode = data.cep;
          this.leader.address.complement = data.complemento;
          this.leader.address.street = data.logradouro;
          this.leader.address.district = data.bairro;
          this.$store
            .dispatch(FIND_CITY_IBGE, data.ibge)
            .then(data => {
              self.$refs.autocomplete.addToken(
                new utils.CityModelToken(data.id, data.name_with_state, null)
              );
              self.leader.address.city.id = data.id;
              self.leader.address.city.name_with_state = data.name_with_state;
              self.leader.address.city_id = data.id;
              utils.loader.hide();
            })
            .catch(error => {
              console.error(error);
              utils.loader.hide();
            });
        })
        .catch(error => {
          console.error(error);
          utils.loader.hide();
          alert("Infelizmente não conseguimos carregar os dados do cep.");
        });
    },
    getCep() {
      return this.$refs.zipcode.nativeView.text;
    },
    setCep(zipcode) {
      this.$refs.zipcode.nativeView.text = zipcode;
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../assets/scss/app-variables";
// End custom common variables

// Custom styles
.page-content {
  padding: 15 15 0 15;
}
</style>
