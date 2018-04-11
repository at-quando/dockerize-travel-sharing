<template>
  <div class="app">
    <transition name="nav-slide-fade">
      <navbar class="navbar" v-if="navbarToggle"></navbar>
    </transition>
    <noti></noti>
    <div class="content" :class="{'content-nav': !navbarToggle}">
      <transition name="slide-fade">
        <router-view/>
      </transition>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script>
import GoogleMap from './components/google-map'
import * as types from './store/types'
import {mapActions, mapGetters} from 'vuex'
import {loadFbSdk, getFbLoginStatus} from './helper/authFacebook.js'

export default {
  components: {
    GoogleMap
  },
  data () {
    return {
      navbarToggle: true
    }
  },
  mounted () {
    const provider = localStorage.getItem('PROVIDER')
    if (provider === 'fb') {
      loadFbSdk()
      .then(getFbLoginStatus)
      .then(response => {
        if (response.status === 'connected') {
          this.setConnected({status: true, provider: 'fb'})
          this.getFacebookUser(response)
        } else {
          this.setConnected({status: false})
        }
      })
    } else if (provider === 'email') {
      this.checkLogin()
    }
  },
  methods: {
    ...mapActions({
      checkLogin: types.CHECK_LOGIN,
      setConnected: types.SET_CONNECTION,
      getFacebookUser: types.GET_FACEBOOK_USER
    })
  },
  computed: {
    ...mapGetters({
      isNotLoader: types.LOADING_COMPLETED
    })
  },
  watch: {
    $route (to, from) {
      this.navbarToggle = !(to.name === 'Post' || to.name === 'Preview')
    }
  }
}
</script>
<style lang="scss">
.navbar {
  position: absolute;
  top: 0;
  left: 0;
}
.is-not-loader {
  display: none;
}
.loader-center {
  position: absolute;
  z-index: 5;
}
.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter {
  transform: translateY(-2000px);
  opacity: 0;
}
.nav-slide-fade-enter-active {
  transition: all .1s ease;
}
.nav-slide-fade-leave-active {
  transition: all .1s ease;
}
.nav-slide-fade-enter, .nav-slide-fade-leave-to  {
  transform: translateY(-100px);
  height: 0;
  opacity: 0;
}
.content-nav {
  padding: 0;
  overflow: hidden;
  height: 100vh;
  .actions-item > span {
    color: white;
  }
}
.content {
  transition: 0.1s all ease;
}
</style>