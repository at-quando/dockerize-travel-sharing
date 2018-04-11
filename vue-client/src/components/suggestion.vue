<template>
  <div class="suggest">
    <div class="content">
    <div class="nav-wrapper">
      <div class="col s12">
        <a href="#!" class="breadcrumb">First</a> >
        <a href="#!" class="breadcrumb">Second</a> >
        <a href="#!" class="breadcrumb">Third</a>
      </div>
    </div>
      <article class="best-post clearfix">
        <h2 class="post-title">{{bestPost.title}}</h2>
        <router-link :to="`/post/${bestPost._id}`">
          <div class="thumb-best overlay">
            <img :src="bestPost.img" class="post-pic" alt='best-post-pic'>
          </div>
        </router-link>
        <div class="entry-meta">
          <div class="entry-excerpt">
            <p>
              {{bestPost.description | limit_description}}
            </p>
            <span>{{bestPost.created_at}}</span>
            <span>{{bestPost.views}} views</span>
            <div class="fb-like">
            </div>
          </div>
        </div>
      </article>
      <ul v-masonry transition-duration="0s" item-selector=".post-item" class="post-list">
        <li v-masonry-tile v-bind:key="index" v-for="(post, index) in suggestPosts" class="post-item">
          <article class="">
            <router-link :to="`/post/${post._id}`">
              <div class="thumb overlay">
                <img :src="post.img" class="post-pic" alt='news-pic'>
              </div>
              <h2>{{post.title}}</h2>
            </router-link>
            <div class="entry-meta">
              <span>{{post.created_at}}</span>
              <span>{{post.views}} views</span>
            </div>
            <div class="entry-excerpt">
              <p>
                {{post.description | limit_description}}
              </p>
            </div>
            <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2F1987studio%2F297379087406821&width=350&layout=standard&action=like&size=small&show_faces=true&share=true&height=80&appId=884618848377974" width="350" height="80" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
          </article>
        </li>
      </ul>
    </div>
    <div class="sidebar">
      <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F1987studio%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=884618848377974" width="340" height="400" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
    </div>
  </div>
</template>

<script>
// import {mapGetters, mapActions} from 'vuex'
// import * as types from '../store/types'

export default {
  name: 'Suggestion',
  data () {
    return {
      suggestPosts: [
        {
          '_id': '5a44a1008c257536a59a6b26',
          'img': 'https://cdn3.ivivu.com/2017/12/da-nang-ban-phao-hoa-mung-tet-duong-lich-ivivu-1-370x215.jpg',
          'title': 'Willie Barrera',
          'created_at': '2014-03-06T12:29:27 -07:00',
          'views': 23,
          'description': 'Ad aute adipisicing pariatur magna aute sint sint commodo fugiat sint dolore anim. Enim voluptate ipsum non laborum cupidatat anim qui commodo laborum elit aliqua. Ipsum Lorem dolor ex sunt do aliqua laborum proident. Cupidatat elit irure eu voluptate ad in amet ea in cillum ipsum voluptate officia. Qui minim consectetur occaecat dolor nulla laborum veniam. Sint culpa dolor pariatur commodo velit consequat commodo cillum eu ullamco qui laborum exercitation mollit.\r\n'
        },
        {
          '_id': '5a44a100d6c825392123bc04',
          'img': 'https://cdn3.ivivu.com/2017/12/tu-cebu-den-manila-hanh-trinh-7-ngay-kham-pha-philippines-ivivu-7-370x215.jpg',
          'title': 'Ora Bonner',
          'created_at': '2017-11-29T03:17:50 -07:00',
          'views': 25,
          'description': 'Do ex fugiat adipisicing sunt culpa laboris aliqua. Duis elit dolore non exercitation non et tempor ad sint nostrud adipisicing duis duis. Laborum ut nostrud incididunt aute ullamco nisi officia irure in culpa aute veniam velit. Occaecat ipsum adipisicing mollit anim enim occaecat elit mollit laboris. Reprehenderit velit incididunt ullamco laboris incididunt incididunt exercitation est adipisicing ea exercitation.\r\n'
        },
        {
          '_id': '5a44a1003bb34532e869f6c7',
          'img': 'https://cdn3.ivivu.com/2017/12/silk-path-grand-resort-ivivu-4-370x215.jpg',
          'title': 'Bonnie Richard',
          'created_at': '2017-10-11T02:06:59 -07:00',
          'views': 34,
          'description': 'Eiusmod elit Lorem sint consequat fugiat deserunt aliquip tempor velit est adipisicing amet minim sit. Magna enim labore qui sunt eiusmod ad. Elit laboris nisi consequat excepteur. Irure ullamco ipsum nostrud laboris do ex tempor ea consequat occaecat minim exercitation minim eiusmod. In laborum eu labore enim dolore enim in proident nulla.\r\n'
        },
        {
          '_id': '5a44a100923cd5b2eeebf8fe',
          'img': 'https://cdn3.ivivu.com/2017/12/silk-path-grand-resort-ivivu-4-370x215.jpg',
          'title': 'Short Ingram',
          'created_at': '2014-03-25T09:54:02 -07:00',
          'views': 28,
          'description': 'Esse mollit sit excepteur incididunt minim deserunt eiusmod. Tempor enim ex nostrud elit consectetur sint in qui cillum fugiat. Consequat amet aliquip ad exercitation. Aute ullamco qui irure consectetur ut dolor laborum ad occaecat anim laboris enim. Irure aute elit aliqua fugiat sunt aliquip consectetur non aliquip Lorem id nostrud labore pariatur. Eu pariatur enim cillum laboris enim.\r\n'
        },
        {
          '_id': '5a44a100f716014ac920f220',
          'img': 'https://cdn3.ivivu.com/2017/12/silk-path-grand-resort-ivivu-4-370x215.jpg',
          'title': 'Rosanna Nicholson',
          'created_at': '2015-06-23T12:28:50 -07:00',
          'views': 32,
          'description': 'Pariatur excepteur cillum excepteur velit aliqua qui ad mollit aliqua fugiat amet dolor ullamco occaecat. Aliquip deserunt amet irure culpa dolore exercitation est ullamco commodo ex culpa reprehenderit cillum. Nulla exercitation eiusmod officia reprehenderit sunt aute cupidatat exercitation cupidatat. Commodo anim proident sunt quis nisi commodo ut do ullamco irure fugiat. Irure ut anim irure enim officia nostrud anim do cillum laboris voluptate eu ad voluptate. Amet fugiat Lorem magna duis amet quis qui minim esse in nulla irure proident.\r\n'
        }
      ],
      bestPost: {
        '_id': '5a44a100923cd5b2eeebf8fe',
        'img': 'https://cdn3.ivivu.com/2017/12/silk-path-grand-resort-ivivu-4-370x215.jpg',
        'title': 'Short Ingram',
        'created_at': '2014-03-25T09:54:02 -07:00',
        'views': 28,
        'description': 'Esse mollit sit excepteur incididunt minim deserunt eiusmod. Tempor enim ex nostrud elit consectetur sint in qui cillum fugiat. Consequat amet aliquip ad exercitation. Aute ullamco qui irure consectetur ut dolor laborum ad occaecat anim laboris enim. Irure aute elit aliqua fugiat sunt aliquip consectetur non aliquip Lorem id nostrud labore pariatur. Eu pariatur enim cillum laboris enim.\r\n'
      }
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>
