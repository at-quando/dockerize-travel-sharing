<template>
  <div class="main-detail-page">
    <router-link class="close-button btn-no-border" :to="{name: 'SubDetail', params: { id: this.$route.params.id }}" tag="a">
      <i class="fa fa-times" aria-hidden="true"></i>
    </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'MainDetail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
