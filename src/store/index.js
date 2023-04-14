import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
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
    user: null,
    adress: null,
    notification: {
      active: false,
      text: "Exemple",
      type: "error",
    },
  },
  getters: {},
  mutations: {
    SET_USER(state, val) {
      sessionStorage.setItem("loggerUser", JSON.stringify(val));
      state.user = val;
    },
    SET_PATIENT(state, data) {
      state.patientList = data;
    },
    SET_PATIENTS(state, data) {
      state.patientList = data;
    },
    SET_NOTIFICATION(state, notify) {
      state.notification = { ...notify };
    },
    SET_CEP(state, value) {
      state.adress = {
        city: value.localidade,
        state: value.uf,
        ville: value.bairro,
        addr: value.logradouro,
      };
    },
  },
  actions: {
    async LOGIN({ commit }, value) {
      await axios
        .post("/api/login", value)
        .then((res) => {
          if (res) {
            commit("SET_NOTIFICATION", {
              type: "success",
              active: true,
              text: "Seja bem vindo(a).",
            });
            commit("SET_USER", res.data);
          }
        })
        .catch((error) => {
          commit("SET_NOTIFICATION", setError);
          console.log(error);
        });
    },
    async SAVE({ commit, dispatch }, value) {
      await axios
        .post("/api/patients/", value)
        .then((res) => {
          if (res) {
            commit("SET_NOTIFICATION", {
              type: "success",
              active: true,
              text: "Paciente adicionado com sucesso.",
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
      await axios
        .post(`/api/patients/${value.id}`, { params: value })
        .then((res) => {
          if (res) {
            commit("SET_NOTIFICATION", {
              type: "success",
              active: true,
              text: "Paciente editado com sucesso.",
            });
            dispatch("GET_PATIENT");
          }
        })
        .catch((error) => {
          commit("NOTIFICATION", setError);
          console.log(error);
        });
    },
    DELETE({ commit, dispatch }, value) {
      axios
        .delete(`/api/patients/${value.id}`)
        .then((res) => {
          if (res) {
            commit("SET_NOTIFICATION", {
              type: "success",
              active: true,
              text: "Paciente Excluido com sucesso.",
            });
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
    async GET_CEP({ commit }, cep) {
      const baseUrl = "https://viacep.com.br/ws/";
      const url = `${baseUrl}${cep.replace(/\D/g, "")}/json/`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson.erro) {
        commit("SET_NOTIFICATION", setError);
      } else {
        commit("SET_CEP", responseJson);
      }
    },
  },
  modules: {},
});
