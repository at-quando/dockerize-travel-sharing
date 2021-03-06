import Vue from 'vue'
import * as moment from 'moment'

Vue.filter('capitalize', function (value) {
  return value.replace(/\b\w/g, l => l.toUpperCase())
})

Vue.filter('takeImage', function (value) {
  var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  var regex = new RegExp(expression)
  if (value.match(regex)) {
    return value
  } else {
    return process.env.SERVER_IP + 'pictures/' + value
  }
})

Vue.filter('moment', function (date) {
  return moment(date).fromNow()
})

Vue.filter('limit_description', function (graph) {
  if (graph.length > 200) {
    return graph.substr(0, 197) + '...'
  }
  return graph
})

Vue.filter('limit_review_content', function (graph) {
  if (graph.length > 100) {
    return graph.substr(0, 97) + '...'
  }
  return graph
})
