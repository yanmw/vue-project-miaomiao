const state = {
  id: window.localStorage.getItem('nowId') || 1,
  nm: window.localStorage.getItem('nowNm') || '北京'
};
const actions = {};
const mutations = {
  CITY_INFO(state,payload) {
    state.id = payload.id;
    state.nm = payload.nm
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
