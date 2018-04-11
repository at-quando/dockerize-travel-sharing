<template>
  <div>
    <moving-arrow :move-x="arrowMovePx">
    </moving-arrow>
    <div class="post-box">
      <keep-alive
        <component :is="currentView"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import PostCheckIn from './post-checkin'
import PostFilter from './post-filter.vue'
import PostText from './post-text'

export default {
  name: 'add-post',
  props: ['attachImg'],
  components: {
    PostCheckIn,
    PostFilter,
    PostText
  },
  data () {
    return {
      content: '',
      currentView: '',
      arrowObj: {'post-text': -11.5, 'post-check-in': -1.1, 'post-video': 4.7, 'post-filter': 9.7},
      arrowPixel: 0
    }
  },
  computed: {
    arrowMovePx () {
      return this.arrowPixel
    }
  },
  mounted () {
    const blur = document.getElementById('blur')
    blur.className += 'blur'
    this.currentView = this.$route.hash.slice(1)
    this.arrowPixel = this.arrowObj[`${this.currentView}`]
  },
  watch: {
    $route (to, from) {
      this.currentView = this.$route.hash.slice(1)
      this.arrowPixel = this.arrowObj[`${this.currentView}`]
    }
  }
}
</script>
<style lang="scss">
.actions {
  z-index: 2;
}
</style>