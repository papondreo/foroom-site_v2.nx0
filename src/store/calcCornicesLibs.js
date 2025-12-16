export const state = () => ({
  data: null
});

export const mutations = {
  setData(state, data) {
    state.data = data;
  }
};

export const actions = {
  setData({ commit }, payload) {
    // do something
    commit("setData", payload);
  }
};

export const getters = {
  data: s => s.data
};
