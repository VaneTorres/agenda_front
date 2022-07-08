import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    URL: "http://localhost:8000/api/agenda/",
  },
  getters: {
    getURL: (state) => state.URL,
  },
  mutations: {},
  actions: {
    getAxios: (state) => {
      return new Promise((resolve) => {
        axios.get(state.getters.getURL).then((response) => {
          return resolve(response);
        });
      });
    },
    createAxios: (state, { data }) => {
      return new Promise((resolve) => {
        axios.post(state.getters.getURL, data).then((response) => {
          return resolve(response);
        });
      });
    },
    deteleAxios: (state, { data }) => {
      return new Promise((resolve) => {
        axios.delete(state.getters.getURL + data).then((response) => {
          return resolve(response);
        });
      });
    },
    editAxios: (state, { data, id }) => {
      return new Promise((resolve) => {
        axios.put(state.getters.getURL + id, data).then((response) => {
          return resolve(response);
        });
      });
    },
    getOneAxios: (state, { data }) => {
      return new Promise((resolve) => {
        axios.get(state.getters.getURL + data).then((response) => {
          return resolve(response);
        });
      });
    },
  },
  modules: {},
});
