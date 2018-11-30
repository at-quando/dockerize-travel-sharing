<template>
  <div class="container">
    <div id="blur" :class="{'blur': isBlur}">
    </div>
    <div id="cropBox" class="blur blur-index" v-if="enableCropBox">
      <crop-box :editImg="currentImg" @sendImg="takeImg"></crop-box>
    </div>
    <div id="add-post-box" v-if="currentUser" class="filter-place">
      <div class="actions" @click="togglePostBox">
        <router-link to="/new/post#post-text" >
          <div class="actions-item">
            <i class="fa fa-comments" aria-hidden="true"/>
            <span>{{ $t('lang.newsfeed.actions.text') | capitalize }}</span>
          </div>
        </router-link>
        <div class="actions-item" >
          <label for="file-upload"><i class="fa fa-camera"></i></label>
          <input id="file-upload" type="file" name="image" @change="convertImageToBase64" multiple>
          <span>{{ $t('lang.newsfeed.actions.photo') | capitalize }}</span>
        </div>
        <router-link to="/new/post#post-check-in">
          <div class="actions-item">
            <i class="fa fa-compass" aria-hidden="true"/>
            <span>{{ $t('lang.newsfeed.actions.checkin') | capitalize }}</span>
          </div>
        </router-link>
        <router-link to="/new/post#post-video">
          <div class="actions-item">
            <i class="fa fa-video-camera" aria-hidden="true"/>
            <span>{{ $t('lang.newsfeed.actions.video') | capitalize }}</span>
          </div>
        </router-link>
        <router-link to="/post#post-filter">
          <div class="actions-item">
            <i class="fa fa-sort" aria-hidden="true"/>
            <span>{{ $t('lang.newsfeed.actions.filter') | capitalize }}</span>
          </div>
        </router-link>
        <transition name="post-slide-fade">
          <router-view name="a"/>
        </transition>
      </div>
    </div>
    <transition name="post-slide-fade">
      <router-view name="b"/>
    </transition>
    <div class="news-section">
      <ul v-masonry transition-duration="0s" item-selector=".news-item" class="news-list">
        <li v-masonry-tile :key="post" v-for="(post) in posts" class="news-item">
          <div class="news-info">
            <div class="news-header">
              <img class="avatar-user" src="http://3.bp.blogspot.com/-UU-U3Am2BrU/VX3UDjEu-OI/AAAAAAAABFc/z2499qSa_vc/s1600/avatarku.jpg" alt ="">
              <span class="news-user">{{post.posted_by.name}}</span>
              <p class="user-location"><i class="fa fa-map-marker" aria-hidden="true"></i> Da Nang, Viet Nam</p>
            </div>
            <router-link :to="`/post/${post._id}`">
              <img :src="post.image |takeImage" class="news-pic" alt='news-pic'>
            </router-link>
            <div class="actions-news">
              <p class="span-text">{{post.content}}</p>
              <el-tag type="success" v-for="tag in post.hashtag.split(',')" :key="tag.name" v-if="tag != '#'">{{tag}}</el-tag>
              <hr class="small">
              <router-link :to="`/post/${post._id}`">
                <span class="span-text">{{post.comment_counter}} {{ $t('lang.newsfeed.news.comments')}}</span>
              </router-link>
              <i class="fa fa-heart to-the-right bounceIn" :class="{'heart': checkLike(post._id)}" @click="likePost(post)"/>
              <span class="to-the-right"> {{post.likes}} </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import * as types from '../store/types'
import Cropper from 'cropperjs'

export default {
  name: 'NewsFeed',
  data () {
    return {
      show: true,
      isBlur: false,
      imgListPost: [],
      enableCropBox: false,
      cropper: Cropper,
      currentImg: {},
      current: {},
      isHaveImg: false,
      enablePreview: false,
      uploadImg: '',
      isCome: false,
      content: '',
      currentUserLike: [],
      tags: [
          { name: 'Tag 1', type: '' },
          { name: 'Tag 2', type: 'success' },
          { name: 'Tag 3', type: 'info' },
          { name: 'Tag 4', type: 'warning' },
          { name: 'Tag 5', type: 'danger' }
        ]
    }
  },
  mounted () {
    if (localStorage.ACCESS_TOKEN) {
      this.getNewsAuth()
    } else {
      this.getNews()
    }
    this.$redrawVueMasonry()
  },
  methods: {
    ...mapActions({
      getNews: types.GET_ALL_POSTS,
      getNewsAuth: types.GET_ALL_POSTS_AUTH,
      like: types.LIKE
    }),
    likePost (post) {
      if (this.currentUser) {
        this.like(post)
        var result = this.currentUserLike.find((postCheck) => {
          return postCheck === post._id
        })
        if (!result) {
          post.likes = post.likes + 1
          this.currentUserLike.push(post._id)
        } else {
          post.likes = post.likes - 1
          this.currentUserLike = this.currentUserLike.filter(e => e !== post._id)
        }
      }
    },
    convertImageToBase64 () {
      this.current = event.target.files[0]
      this.currentImg = URL.createObjectURL(event.target.files[0])
      this.enableCropBox = true
    },
    reDraw: function () {
      this.$redrawVueMasonry()
    },
    checkLike (id) {
      if (this.currentUser && this.currentUserLike.length === 0) {
        this.currentUserLike = this.currentLike
      }
      return this.currentUserLike.find((x) => { return x === id })
    },
    takeImg: function (value) {
      this.enableCropBox = false
      this.isHaveImg = true
      document.onclick = function () {}
      this.$router.push({ name: 'Post', params: {id: value}, hash: '#post-text' })
    },
    disablePreview () {
      this.enablePreview = false
    },
    togglePostBox ($event) {
      var el = $event.currentTarget
      document.onclick = (event) => {
        if (!(el !== event.target && el.contains(event.target))) {
          if (this.$route.name === 'Post') {
            this.$router.push({name: 'NewsFeed'})
          }
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Post') {
      this.isBlur = true
    }
    next()
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'NewsFeed') {
      const blur = document.getElementById('blur')
      blur.classList.remove('blur')
    }
    next()
  },
  computed: {
    ...mapGetters({
      currentUser: types.CURRENT_USER,
      posts: types.POSTS,
      currentLike: types.CURRENT_LIKE
    })
  }
}
</script>

<style lang="scss" scoped>
.post-slide-fade-enter-active {
  transition: all 0.2s ease;
}

.post-slide-fade-leave-active {
  transition: all 0.2s ease;
}

.post-slide-fade-enter, .post-slide-fade-leave-to{
  opacity: 0;
  max-height: 0;
}
.post-slide-fade-enter-to{
  max-height: 15rem;
}
.post-slide-fade-leave{
  max-height: 15rem;
}
</style>
