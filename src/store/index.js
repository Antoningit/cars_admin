import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import { resolveMappedData } from "../utils";
import {SERVER_HOST} from '../constants' 
Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: { cars: [], user: false },
  mutations: {
    SET_CARS: (state, payload) => {
      state.cars = payload;
    },
    PUSH_CAR_ON_FRONTEND: (state, payload) => {
      state.cars.push(payload);
    },
    REMOVE_CAR_ON_FRONTEND: (state, payload) => {
      state.cars = state.cars.filter(({ id }) => id !== payload);
    },
    CHANGE_CAR_ON_FRONTEND: (state, payload) => {
      console.log(payload);
      state.cars = state.cars.map((entry) =>
        Number(entry.id) === Number(payload.id) ? payload : entry
      );
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async getCars({ commit }) {
      const res = await fetch(`${SERVER_HOST}getcars`);
      const data = await res.json();
      const mappedData = resolveMappedData(data);
      commit("SET_CARS", mappedData);
    },
    getCar({ state }, param) {
      const car = state.cars.find(({ id }) => id === param);
      return car != null ? car : null;
    },
    pushCarOnFrontend({ commit }, car) {
      commit("PUSH_CAR_ON_FRONTEND", car);
    },
    removeCarOnFrontend({ commit }, id) {
      commit("REMOVE_CAR_ON_FRONTEND", id);
    },
    changeCarOnFrontend({ commit }, id) {
      commit("CHANGE_CAR_ON_FRONTEND", id);
    },
    login({ commit }, { login, password }) {
      const isLoggedIn = axios
        .post(`${SERVER_HOST}login`, { login, password })
        .then((res) => {
          if (res.status === 200) {
            commit("SET_USER", true);
            localStorage.setItem("token", res.data.token);
            return true;
          }
          return false;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
      return isLoggedIn;
    },
    auth({ commit }) {
      const isLoggedIn = axios
        .get(`${SERVER_HOST}auth`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (res.status === 200) {
            commit("SET_USER", true);
            localStorage.setItem("token", res.data.token);
            return true;
          }
          return false;
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
          return false;
        });
      return isLoggedIn;
    },
  },
  getters: {
    CARS: (state) => {
      return state.cars;
    },
    isLoggedIn(state) {
      return state.user;
    },
  },
  modules: {},
});
