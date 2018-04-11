import * as types from '../types'
import Vue from 'vue'

const state = {
  status: '',
  posts: [],
  currentLike: []
}

const getters = {
  [types.GET_STATUS]: state => {
    return state.status
  },
  [types.POSTS]: state => {
    return state.posts
  },
  [types.CURRENT_LIKE]: state => {
    return state.currentLike
  }
}

const mutations = {
  [types.MUTATE_GET_ALL_POSTS]: (state, payload) => {
    state.posts = payload.posts
  },
  [types.MUTATE_GET_ALL_POSTS_AUTH]: (state, payload) => {
    state.posts = payload.posts
    state.currentLike = payload.currentLike
  }
}

const actions = {
  [types.GET_ALL_POSTS]: ({commit}, payload) => {
    Vue.http.get('posts')
    .then(response => {
      commit(types.MUTATE_GET_ALL_POSTS, response.body)
    }, function (err) {
      console.log(err)
    })
  },
  [types.GET_ALL_POSTS_AUTH]: ({commit}, payload) => {
    Vue.http.get('posts/wAuth')
    .then(response => {
      commit(types.MUTATE_GET_ALL_POSTS_AUTH, response.body)
    }, function (err) {
      console.log(err)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
