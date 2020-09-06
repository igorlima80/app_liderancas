<template>
  <Page class="page" @loaded="pageLoaded()" @unloaded="pageUnloaded()" actionBarHidden="true">
    <FlexboxLayout flexDirection="column" justifyContent="space-around" class="page-content">
      <!-- <GridLayout rows="auto,auto,auto,auto,auto" class="page-content"> -->
      <Image src="~/assets/images/logo.png" width="30%" />
      <CardView margin="1" elevation="5" radius="7" alignSelf="center">
        <GridLayout rows="auto,auto,auto,auto,auto" class="m-15">
          <Label row="0" text="Cadastro" class="text-center font-weight-bold m-b-10 text-primary" />
          <TextField
            row="1"
            ref="email"
            hint="Email"
            keyboardType="email"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="email"
            returnKeyType="next"
            @returnPress="focusPassword"
            class="m-b-10"
          />
          <TextField
            row="2"
            ref="password"
            hint="Senha"
            secure="true"
            v-model="password"
            @returnPress="focusConfirmPassword"
            returnKeyType="next"
            class="m-b-10"
          />
          <TextField
            row="3"
            ref="confirmPassword"
            hint="Confirmar senha"
            secure="true"
            v-model="confirmPassword"
            @returnPress="submit"
            returnKeyType="done"
            class="m-b-15"
          />
          <Button row="4" text="Cadastrar" @tap="submit" class="btn btn-primary m-b-10" />
        </GridLayout>
      </CardView>
      <Label alignSelf="center" class="p-5 text-primary" @tap="$navigator.navigate('/login')">
        <FormattedString>
          <Span text="Já tem uma conta? " />
          <Span text="Faça Login!" class="font-weight-bold" />
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import LoginService from "~/services/LoginService";
import { REGISTER } from "~/store/actions.type";
import SelectedPageService from "../shared/selected-page-service";
import { Feedback } from "nativescript-feedback";
import validator from "email-validator";
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
const feedback = new Feedback();
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Signup");
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      this.$refs.confirmPassword.nativeView.focus();
    },
    submit() {
      if (!this.email || !this.password || !this.confirmPassword) {
        feedback.error({
          message:
            "Por favor, digite o endereço de e-mail, senha e a confirmação de senha."
        });
        return;
      }
      if (!validator.validate(this.email)) {
        feedback.error({
          message: "Digite um endereço de e-mail válido."
        });
        return;
      }
      if (this.password != this.confirmPassword) {
        feedback.error({
          message: "Senhas não conferem!"
        });
        return;
      }

      this.signup();
    },
    signup() {
      if (getConnectionType() === connectionType.none) {
        feedback.error({
          message:
            "Saúde+ requer uma conexão com a Internet para efetuar o login."
        });
        return;
      }

      utils.loader.show();
      this.$store
        .dispatch(REGISTER, { email: this.email, password: this.password })
        .then(() => {
          this.$navigator.navigate("/home", {
            clearHistory: true
          });
          utils.loader.hide();
        })
        .catch(error => {
          console.error(error);
          utils.loader.hide();
          feedback.error({
            message:
              "Infelizmente não conseguimos encontrar sua conta. Tente mais tarde."
          });
        });
    },
    pageLoaded() {
      // orientationModule.setCurrentOrientation("portrait");
      // utils.gesturesEnabled(false);
    },
    pageUnloaded() {
      // orientationModule.orientationCleanup();
      // utils.gesturesEnabled(true);
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../assets/scss/app-variables";
// End custom common variables

// Custom styles
.page {
  background-color: #DDEDEA;
}
</style>