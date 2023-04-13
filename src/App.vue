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
    </v-app-bar>
    <v-main class="pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
