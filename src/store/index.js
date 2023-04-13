import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
Vue.use(Vuex);
const setError = {
  type: "error",
  active: true,
  text: "Ocorreu um erro, tente novamente mais tarde.",
};
export default new Vuex.Store({
  state: {
    modalActive: false,
    contactList: [],
    notification: {
      active: false,
      text: "Exemple",
      type: "error",
    },
  },
  getters: {},
  mutations: {
    SET_MODAL(state, val) {
      state.modalActive = val;
    },
    SET_CONTACT(state, data) {
      state.contactList = data;
    },
    SET_CONTACTS(state, data) {
      state.contactList = data;
    },
    SET_NOTIFICATION(state, notify) {
      // state.notification.type = "error";
      // state.notification.active = true;
      // state.notification.text = text;z
      state.notification = { ...notify };
    },
  },
  actions: {
    async SAVE({ commit, dispatch }, value) {
      await fetch("/api/contacts/", {
        method: "POST",
        body: JSON.stringify(value),
      })
        .then((res) => {
          if (res) {
            commit("SET_NOTIFICATION", {
              type: "success",
              active: true,
              text: "Contato adicionado com sucesso.",
            });
            if (router.currentRoute.name === "home") {
              router.push("/list");
            } else {
              dispatch("GET_CONTACT");
            }
          }
        })
        .catch((error) => {
          commit("NOTIFICATION", setError);
          console.log(error);
        });
    },
    async UPDATE({ commit, dispatch }, value) {
      await fetch(`/api/contacts/${value.id}`, {
        method: "POST",
        body: JSON.stringify(value),
      })
        .then((res) => {
          if (res) {
            commit("SET_NOTIFICATION", {
              type: "success",
              active: true,
              text: "Contato editado com sucesso.",
            });
            commit("SET_MODAL", false);

            dispatch("GET_CONTACT");
          }
        })
        .catch((error) => {
          commit("NOTIFICATION", setError);
          console.log(error);
        });
    },
    DELETE({ commit, dispatch }, value) {
      fetch(`/api/contacts/${value.id}`, {
        method: "DELETE",
        body: JSON.stringify(value),
      })
        .then((res) => {
          if (res) {
            commit("SET_NOTIFICATION", {
              type: "success",
              active: true,
              text: "Contato Excluido com sucesso.",
            });
            commit("SET_MODAL", false);

            dispatch("GET_CONTACT");
          }
        })
        .catch((error) => {
          commit("NOTIFICATION", setError);
          console.log(error);
        });
    },
    async GET_CONTACT({ commit }, state) {
      let url = "/api/contacts";
      const params = {
        query: state,
      };
      const urlPaarams =
        state !== undefined
          ? (url += "?" + new URLSearchParams(params).toString())
          : url;
      await fetch(urlPaarams)
        .then((response) => {
          const contacts = JSON.parse(response._bodyText);
          commit("SET_CONTACTS", contacts.contacts);
        })
        .catch((error) => {
          commit("SET_NOTIFICATION", setError);
          console.log(error);
        });
    },
  },
  modules: {},
});
