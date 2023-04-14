<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex header align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon x-large color="whith darken-4"> mdi-book-open </v-icon>
          <h3 class="ml-3 white--text">SUSnet</h3>
        </div>
        <div class="white--text">
          <v-btn text outlined @click="onLogout()">Sair</v-btn>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-alert
        class="app-notification"
        v-if="notification.active"
        prominent
        :type="notification.type"
      >
        {{ notification.text }}
      </v-alert>
    </v-app-bar>

    <v-main class="pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapState({
      notification: (state) => state.notification,
    }),
  },
  watch: {
    notification(newValue) {
      if (newValue.active) {
        var temp = setTimeout(() => {
          this.$store.commit("SET_NOTIFICATION", false);
        }, 5000);
      } else {
        clearTimeout(temp);
      }
    },
  },
  methods: {
    onLogout() {
      sessionStorage.removeItem("loggerUser");
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss">
.header {
  width: 100%;
}
.app-notification {
  width: 300px;
  display: flex;
  right: 0;
  position: absolute;
}
</style>
