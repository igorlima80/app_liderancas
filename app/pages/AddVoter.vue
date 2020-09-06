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
      <Label class="action-bar-title" text="Adicionar Membro"></Label>
    </ActionBar>
    <GridLayout rows="*,auto" columns="*,*">
      <ScrollView col="0" row="0" colSpan="2">
        <GridLayout
          class="page-content"
          rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto"
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
            <Label text="Nome*" class="label" />
            <TextField
              ref="name"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="member.name"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="2" colSpan="2">
            <Label text="Data de nascimento" class="label" />
            <DatePickerField
              @dateChange="onDateTimeChange1"
              dateFormat="yyyy-MM-dd"
            ></DatePickerField>
          </StackLayout>
          <StackLayout class="input-field" row="3" colSpan="2">
            <Label text="CPF" class="label" />
            <MaskedTextField
              ref="cpf"
              keyboardType="number"
              autocorrect="false"
              autocapitalizationType="none"
              returnKeyType="next"
              mask="000.000.000-00"
            />
          </StackLayout>
          <StackLayout class="input-field" row="4" colSpan="2">
            <Label text="Telefone" class="label" />
            <MaskedTextField
              ref="phone"
              keyboardType="number"
              autocorrect="false"
              autocapitalizationType="none"
              returnKeyType="next"
              mask="(00)0000-0000"
            />
          </StackLayout>
          <StackLayout class="input-field" row="5" colSpan="2">
            <Label text="Celular" class="label" />
            <MaskedTextField
              ref="cell_phone"
              keyboardType="number"
              autocorrect="false"
              autocapitalizationType="none"
              returnKeyType="next"
              mask="(00)00000-0000"
            />
          </StackLayout>
          <Label
            row="6"
            col="0"
            text="Endereço"
            colspan="2"
            class="font-weight-bold text-primary m-y-20"
          />
          <StackLayout class="input-field" row="7" colSpan="2">
            <Label text="Descrição" class="label" />
            <TextField
              ref="description"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="member.address.description"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="8" colSpan="2">
            <Label text="CEP*" class="label" />
            <MaskedTextField
              ref="zipcode"
              @blur="onBlur"
              keyboardType="number"
              autocorrect="false"
              autocapitalizationType="none"
              returnKeyType="next"
              mask="00000-000"
            />
          </StackLayout>
          <StackLayout class="input-field" row="9" colSpan="2">
            <Label text="Logradouro*" class="label" />
            <TextField
              ref="street"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="member.address.street"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="10" colSpan="2">
            <Label text="Complemento" class="label" />
            <TextField
              ref="complement"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="member.address.complement"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="11" colSpan="2">
            <Label text="Bairro*" class="label" />
            <TextField
              ref="district"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="member.address.district"
              returnKeyType="next"
            />
          </StackLayout>

          <StackLayout class="input-field" row="12" colSpan="2">
            <Label text="Número*" class="label" />
            <TextField
              ref="number"
              keyboardType="number"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="member.address.number"
              returnKeyType="next"
            />
          </StackLayout>
          <StackLayout class="input-field" row="13" colSpan="2">
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
        :source="member"
        :metadata="userMetadata"
        :groups="groups"
        row="0"
        col="0"
        colSpan="2"
          ></RadDataForm>-->
        </GridLayout>
      </ScrollView>
      <GridLayout col="0" row="1" colSpan="2" rows="auto" columns="*,*">
        <Button
          row="0"
          col="0"
          text="Cancelar"
          @tap="$navigator.navigate('/voters')"
          class="btn btn-secondary"
        />
        <Button
          row="0"
          col="1"
          text="Salvar"
          @tap="addVoter"
          class="btn btn-primary"
        />
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import LoginService from "~/services/LoginService";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import SelectedPageService from "../shared/selected-page-service";
import { Feedback } from "nativescript-feedback";
import {
  ADD_VOTER,
  GET_CITES,
  FIND_ZIPCODE,
  FIND_CITY_IBGE
} from "~/store/actions.type";
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
const feedback = new Feedback();
const loginService = new LoginService();

export default {
  data() {
    return {
      member: {
        name: "",
        cpf: "",
        birthdate: "",
        phone: "",
        cell_phone: "",
        leader_id: loginService.token,
        address: {
          description: "",
          zipcode: "",
          street: "",
          number: "",
          complement: "",
          district: "",
          city_id: ""
        }
      },
      dataItems: new ObservableArray()
    };
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
  methods: {
    addVoter() {
      if (getConnectionType() === connectionType.none) {
        feedback.error({
          message:
            "Lideranças requer uma conexão com a Internet para cadastrar o membro."
        });
        return;
      }

      if (
        !this.member.name ||
        !this.getCep() ||
        !this.member.address.street ||
        !this.member.address.number ||
        !this.member.address.district ||
        !this.member.address.city_id
      ) {
        feedback.error({
          message: "Por favor, digite os campos obrigatórios(*)."
        });
        return;
      }

      utils.loader.show();
      this.member.cpf = this.getCpf();
      this.member.address.zipcode = this.getCep();
      this.member.phone = this.getPhone();
      this.member.cell_phone = this.getCellPhone();

      this.$store
        .dispatch(ADD_VOTER, this.member)
        .then(() => {
          this.$navigator.navigate("/voters");
          utils.loader.hide();
          feedback.success({
            message: "Membro adicionado com sucesso."
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
    onDidAutoComplete({ token }) {
      this.member.address.city_id = token.id;
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
          this.member.address.zipcode = data.cep;
          this.member.address.complement = data.complemento;
          this.member.address.street = data.logradouro;
          this.member.address.district = data.bairro;
          this.$store
            .dispatch(FIND_CITY_IBGE, data.ibge)
            .then(data => {
              self.$refs.autocomplete.addToken(
                new utils.CityModelToken(data.id, data.name_with_state, null)
              );
              self.member.address.city_id = data.id;
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
    getCpf() {
      return this.$refs.cpf.nativeView.text;
    },
    setCpf(cpf) {
      this.$refs.cpf.nativeView.text = cpf;
    },
    getCep() {
      return this.$refs.zipcode.nativeView.text;
    },
    setCep(zipcode) {
      this.$refs.zipcode.nativeView.text = zipcode;
    },
    getPhone() {
      return this.$refs.phone.nativeView.text;
    },
    setPhone(phone) {
      return this.$refs.phone.nativeView.text - phone;
    },
    getCellPhone() {
      return this.$refs.cell_phone.nativeView.text;
    },
    setCellPhone(cell_phone) {
      return (this.$refs.cell_phone.nativeView.text = cell_phone);
    },
    onDateTimeChange1(args) {
      this.member.birthdate = args.value;
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
