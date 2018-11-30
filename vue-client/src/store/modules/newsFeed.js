import * as types from '../types'
import Vue from 'vue'
import router from '../../router'

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
    console.log(1213)
    return {...state.posts}
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
  },
  [types.MUTATE_CREATE_POST]: (state, payload) => {
    state.posts.push(payload.post)
  },
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
  },
  [types.CREATE_POST]: ({commit}, payload) => {
    const formData = new FormData()
    formData.append('file', payload.img)
    formData.append('content', payload.content)
    formData.append('hashtag', payload.hashtag)
    Vue.http.post('posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setTimeout(() => { router.push({name: 'NewsFeed'}) }, 1000)
      commit(types.MUTATE_CREATE_POST, response.body)
    }, function (error) {
      console.log(error)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
