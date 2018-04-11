import * as types from '../types'
import Vue from 'vue'

const state = {
  link: ''
}

const getters = {
  [types.LINK]: state => {
    return state.link
  }
}

const mutations = {
  [types.MUTATE_UPLOAD_IMG]: (state, payload) => {
    state.link = payload.link
  },
  [types.MUTATE_CREATE_ARTICLE]: (state, payload) => {
    // state.link = payload.link
  }
}

const actions = {
  [types.UPLOAD_IMG]: ({commit}, payload) => {
    const formData = new FormData()
    formData.append('file', payload)
    Vue.http.post('images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      commit(types.MUTATE_UPLOAD_IMG, response.body)
    }, function (error) {
      console.log(error)
    })
  },
  [types.CREATE_ARTICLE]: ({commit}, payload) => {
    Vue.http.post('articles', payload)
    .then(response => {
      console.log(response.body)
      commit(types.MUTATE_CREATE_ARTICLE, response.body)
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
