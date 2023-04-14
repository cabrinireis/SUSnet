<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login SUSnet</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login.user"
                    prepend-icon="mdi-account"
                    name="login"
                    label="Usuário"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="login.pass"
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Senha"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onLogin()">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      login: {
        user: "",
        pass: "",
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    async onLogin() {
      await this.$store.dispatch("LOGIN", this.login);
      if (this.user) {
        this.$router.push("/list");
      }
    },
  },
};
</script>

<style></style>
