import axios from "axios";

const API_URL = process.env.VUE_APP_API;

const state = {
  loading: false,
  status: true,
  errors: "",
  tags: [],
};
const actions = {
  get({ commit }) {
    commit("LOADING", true);

    axios.get(`${API_URL}/tags`).then((response) => {
      commit("UPDATE_TAGS", response.data.data);
      commit("LOADING", false);
    });
  },
  add({ commit }, tag) {
    commit("LOADING", true);

    axios
      .post(`${API_URL}/tags`, { name: tag })
      .then(() => {
        commit("SUCCESS");
        commit("LOADING", false);
      })
      .catch((error) => {
        commit("LOADING", false);
        commit("ERROR", error);
      });
  },
  update({ commit }, tag) {
    commit("LOADING", true);

    axios
      .put(`${API_URL}/tags/${tag.id}`, { name: tag.newName })
      .then(() => {
        commit("LOADING", false);
        commit("SUCCESS");
      })
      .catch((error) => {
        commit("LOADING", false);
        commit("ERROR", error);
      });
  },
  delete({ commit }, id) {
    commit("LOADING", true);

    axios
      .delete(`${API_URL}/tags/${id}`)
      .then(() => {
        commit("SUCCESS");
      })
      .catch((error) => {
        commit("LOADING", false);
        commit("ERROR", error);
      });
  },
};
const mutations = {
  LOADING(state, payload) {
    state.loading = payload;
  },
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
  loading: (state) => state.loading,
  status: (state) => state.status,
  errors: (state) => state.errors,
  tags: (state) => state.tags,
  tagById: (state) => (id) => {
    return state.tags.find((tag) => tag.id === id);
  },
};

const tagModule = {
  state,
  mutations,
  actions,
  getters,
};

export default tagModule;
