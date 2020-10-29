import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: [],
    pageSize: null,
    totalUsers: null
  },
  mutations: {
    FETCH_USERS (state, payload) {
      state.users = payload.rangedUsers
      state.pageSize = payload.pageSize
      state.totalUsers = payload.users.length
    }
  },
  actions: {
    fetchUsers ({ commit }, { page, pageSize }) {
      axios({ url: 'https://jsonplaceholder.typicode.com/users', method: 'GET' })
        .then((response) => {
          const users = response.data
          const rangedUsers = users.slice((page - 1) * pageSize, page * pageSize)
          commit('FETCH_USERS', { users, rangedUsers, pageSize })
        })
        .catch((error) => {
          console.log(error.statusText)
        })
    }
  },
  getters: {
    users: state => state.users,
    totalUsers: state => state.totalUsers
  }
})

export default store
