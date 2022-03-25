import axios from "axios";

const API_URL = process.env.VUE_APP_API;

const state = {
  status: true,
  errors: "",
  tags: [],
};
const actions = {
  get({ commit }) {
    axios.get(`${API_URL}/tags`).then((response) => {
      commit("UPDATE_TAGS", response.data.data);
    });
  },
  add({ commit }, tag) {
    axios.post(`${API_URL}/tags`, { name: tag }).then((response) => {
      commit("LOG", response);
    });
  },
  update({ commit }, tag) {
    console.log(tag);
    axios
      .put(`${API_URL}/tags/${tag.id}`, { name: tag.newName })
      .then((response) => {
        commit("LOG", response);
      });
  },
  delete({ commit }, id) {
    axios.delete(`${API_URL}/tags/${id}`).then((response) => {
      commit("LOG", response);
    });
  },
};
const mutations = {
  SUCCESS(state) {
    state.status = true;
  },
  ERROR(state, payload) {
    state.status = false;
    state.errors = payload;
  },
  UPDATE_TAGS(state, payload) {
    state.tags = payload;
  },
  LOG(state, payload) {
    console.log(state);
    console.log(payload);
  },
};
const getters = {
  tags: (state) => state.tags,
  tagById: (state) => (id) => {
    return state.tags.find((tag) => tag.id === id);
  },
  status: (state) => state.status,
  errors: (state) => state.errors,
};

const tagModule = {
  state,
  mutations,
  actions,
  getters,
};

export default tagModule;
