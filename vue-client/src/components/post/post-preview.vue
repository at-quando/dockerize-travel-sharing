<template>
  <div class="preview" v-if="post.posted_by">
    <div class="preview-img-box">
      <img class="preview-img" :src="post.image |takeImage" alt ="">
    </div>
    <div class="news-item">
      <div class="news-info">
        <div class="news-header">
          <img class="avatar-user" src="http://3.bp.blogspot.com/-UU-U3Am2BrU/VX3UDjEu-OI/AAAAAAAABFc/z2499qSa_vc/s1600/avatarku.jpg" alt ="">
          <span class="news-user">{{post.posted_by.name}}</span>
        </div>
        <div class="actions-news">
          <p>{{post.content}}</p>
            <el-tag type="success" v-for="tag in post.hashtag.split(',')" :key="tag.name" v-if="tag != '#'">{{tag}}</el-tag>
          <hr class="small">
          <span>{{post.comment_counter}} {{ $t('lang.newsfeed.news.comments')}}</span>
          <i class="fa fa-heart bounceIn to-the-right" @click="likePost(post)" :class="{'heart': checkLike}"></i>
          <a class="to-the-right"><span  class="liker-text" v-liker="{likes: post.user, yourLike: checkLike, yourName: currentUser.name}"></span></a>
          <span class="to-the-right">{{post.likes}} </span>
        </div>
        <ul class="comments-box">
          <li class="comment-item" v-for="comment in comments">
            <img class="avatar-user" src="http://3.bp.blogspot.com/-UU-U3Am2BrU/VX3UDjEu-OI/AAAAAAAABFc/z2499qSa_vc/s1600/avatarku.jpg" alt ="">
            <div class="comment-content"> 
              <span class="comment-user">{{comment.user_id.name}}</span>
              <p class="comment-text">{{comment.content}}</p>
              <p class="date-time">{{comment.created_at | moment}}</p>
            </div>
          </li>
        </ul>
        <div class="comment-type">
          <input type="text" v-model="content" placeholder="Write your comment">
          <i class="fa fa-paper-plane-o" aria-hidden="true" @click="comment()"></i>
        </div>
      </div>
    </div>
    <router-link class="close-button btn-no-border" :to="{name: 'NewsFeed'}" tag="button">
      <i class="fa fa-times" aria-hidden="true"></i>
    </router-link>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import * as types from '../../store/types'

export default {
  name: 'Preview',
  data () {
    return {
      content: '',
      currentView: '',
      postTemp: [],
      checkLike: false
    }
  },
  created () {
    this.$http.get('posts/check', {params: {post_id: this.$route.params.id}})
    .then(response => {
      this.checkLike = response.status === 200
    }, function (err) {
      console.log(err)
    })
    this.showPost(this.$route.params.id)
  },
  mounted () {
    const blur = document.getElementById('blur')
    blur.className += 'blur'
    console.log(this.post)
  },
  methods: {
    ...mapActions({
      createComment: types.CREATE_COMMENT,
      showPost: types.SHOW_POST,
      like: types.LIKE
    }),
    comment () {
      if (this.content !== '') {
        this.createComment({post_id: this.$route.params.id, content: this.content})
        this.content = ''
        this.post.comment_counter++
      }
    },
    likePost (post) {
      this.like(post)
      console.log(this.currentUser)
      if (this.currentUser) {
        this.checkLike = !this.checkLike
        if (this.checkLike) {
          this.post.user.push({name: this.currentUser.name})
        } else {
          this.post.user = this.post.user.filter(x => x.name !== this.currentUser.name)
        }
      }
      // var result = this.postTemp.find((postCheck) => {
      //   return postCheck === post._id
      // })
      // if (!result) {
      //   post.likes = post.likes + 1
      //   this.postTemp.push(post._id)
      // } else {
      //   post.likes = post.likes - 1
      //   this.postTemp = this.postTemp.filter(e => e !== post._id)
      // }
    }
  },
  computed: {
    ...mapGetters({
      currentUser: types.CURRENT_USER,
      getComments: types.GET_COMMENTS,
      post: types.POST,
      comments: types.COMMENTS
    })
  }
}
</script>
<style lang="scss" scoped>
.preview-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
</style>