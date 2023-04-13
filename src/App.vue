<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <div class="d-flex align-center">
            <v-icon x-large color="whith darken-4"> mdi-book-open </v-icon>
            <h3 class="ml-3 white--text">SUSnet</h3>
          </div>
        </router-link>
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
};
</script>
<style lang="scss">
.app-notification {
  width: 300px;
  display: flex;
  right: 0;
  position: absolute;
}
.app-container {
  background-color: #f8f9fd !important;
}
</style>
