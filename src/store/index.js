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
    patientList: [],
    notification: {
      active: false,
      text: "Exemple",
      type: "error",
    },
  },
  getters: {},
  mutations: {
    SET_USER(state, val) {
      state.user = val;
    },
    SET_MODAL(state, val) {
      state.modalActive = val;
    },
    SET_PATIENT(state, data) {
      state.patientList = data;
    },
    SET_PATIENTS(state, data) {
      state.patientList = data;
    },
    SET_NOTIFICATION(state, notify) {
      console.log(notify);
      // state.notification.type = "error";
      // state.notification.active = true;
      // state.notification.text = text;z
      state.notification = { ...notify };
    },
  },
  actions: {
    async LOGIN({ commit }, value) {
      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(value),
      })
        .then((res) => {
          if (res) {
            commit("SET_NOTIFICATION", {
              type: "success",
              active: true,
              text: "Seja bem vindo(a).",
            });
            commit("SET_USER", res);
          }
        })
        .catch((error) => {
          commit("NOTIFICATION", setError);
          console.log(error);
        });
    },
    async SAVE({ commit, dispatch }, value) {
      await fetch("/api/patients/", {
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
              dispatch("GET_PATIENT");
            }
          }
        })
        .catch((error) => {
          commit("NOTIFICATION", setError);
          console.log(error);
        });
    },
    async UPDATE({ commit, dispatch }, value) {
      await fetch(`/api/patients/${value.id}`, {
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

            dispatch("GET_PATIENT");
          }
        })
        .catch((error) => {
          commit("NOTIFICATION", setError);
          console.log(error);
        });
    },
    DELETE({ commit, dispatch }, value) {
      fetch(`/api/patients/${value.id}`, {
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

            dispatch("GET_PATIENT");
          }
        })
        .catch((error) => {
          commit("NOTIFICATION", setError);
          console.log(error);
        });
    },
    async GET_PATIENT({ commit }, state) {
      let url = "/api/patients";
      const params = {
        query: state,
      };
      const urlPaarams =
        state !== undefined
          ? (url += "?" + new URLSearchParams(params).toString())
          : url;
      await fetch(urlPaarams)
        .then((response) => {
          const res = JSON.parse(response._bodyText);
          commit("SET_PATIENTS", res.patients);
        })
        .catch((error) => {
          commit("SET_NOTIFICATION", setError);
          console.log(error);
        });
    },
  },
  modules: {},
});
