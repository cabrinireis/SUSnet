import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#fa7268",
        secondary: "#167ccd",
        accent: "#82B1FF",
        warning: "#FFDE03",
        success: "#4caf50",
        info: "#2196f3",
        textDark: "#fff",
      },
    },
  },
});
