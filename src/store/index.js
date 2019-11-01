import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

// eslint-disable-next-line import/prefer-default-export
export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setUser(state) {
      // eslint-disable-next-line no-param-reassign
      state.user = firebase.auth().currentUser;
    },
    setLoading(state, paylaod) {
      // eslint-disable-next-line no-param-reassign
      state.loading = paylaod;
    },
    setError(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.error = payload;
    },
    clearError(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
  },

  actions: {
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredDeliveries: [],
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            commit('setLoading', false);
            commit('setError', error);
          },
        );
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredDeliveries: [],
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            commit('setLoading', false);
            commit('setError', error);
          },
        );
    },
    autoLogin({ commit }, payload) {
      commit('setUser', { id: payload.uid });
    },
    signOut({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
      window.location.reload();
    },
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
});
