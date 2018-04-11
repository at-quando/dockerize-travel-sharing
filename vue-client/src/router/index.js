import Vue from 'vue'
import Router from 'vue-router'
// import GoogleMap from '@/components/google-map'
// import Popular from '@/components/popular'
// import SubDetail from '@/components/sub-detail'
// import MainDetail from '@/components/main-detail'
// import GalleryBox from '@/components/gallery-box'
// import Info from '@/components/info'
// import Preview from '@/components/post/post-preview'
// import AuthLogin from '@/components/auth/auth-login'
// import AuthSignUp from '@/components/auth/auth-signup'
// import AddPost from '@/components/post/add-post'

const NewsFeed = () => import(/* webpackChunkName: "group-news" */ '@/components/news-feed.vue')
const Preview = () => import(/* webpackChunkName: "group-news" */ '@/components/post/post-preview')
const AddPost = () => import(/* webpackChunkName: "group-news" */ '@/components/post/add-post')
const GoogleMap = () => import(/* webpackChunkName: "group-map" */ '@/components/google-map')
const Popular = () => import(/* webpackChunkName: "group-popular" */ '@/components/popular')
const SubDetail = () => import(/* webpackChunkName: "group-details" */ '@/components/sub-detail')
const MainDetail = () => import(/* webpackChunkName: "group-details" */ '@/components/main-detail')
const GalleryBox = () => import(/* webpackChunkName: "group-details" */ '@/components/gallery-box')
const Info = () => import(/* webpackChunkName: "group-details" */ '@/components/info')
const AuthLogin = () => import(/* webpackChunkName: "group-auth" */ '@/components/auth/auth-login')
const AuthSignUp = () => import(/* webpackChunkName: "group-auth" */ '@/components/auth/auth-signup')
const Suggestion = () => import(/* webpackChunkName: "group-suggest" */ '@/components/suggestion')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/near-me'
    },
    {
      path: '/near-me',
      name: 'GoogleMap',
      component: GoogleMap,
      children: [
        {
          path: 'place/:id',
          component: SubDetail,
          name: 'SubDetail',
          children: [
            {
              path: 'more-info',
              component: MainDetail,
              children: [
                {
                  path: '',
                  component: Info,
                  name: 'MainDetail'
                },
                {
                  path: 'picture-gallery',
                  name: 'Gallery',
                  component: GalleryBox
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/news-feed',
      component: NewsFeed,
      name: 'NewsFeed',
      children: [
        {
          path: '/post/:id',
          components: {b: Preview},
          name: 'Preview'
        },
        {
          path: 'new',
          components: {a: AddPost},
          name: 'Post',
          meta: { requiresAuth: true },
          alias: ['/new/post', '/post']
        }
      ]
    },
    {
      path: '/popular',
      component: Popular,
      name: 'Popular'
    },
    {
      path: '/suggest',
      component: Suggestion,
      name: 'Suggestion'
    },
    {
      path: '/auth/login',
      component: AuthLogin,
      name: 'AuthLogin',
      meta: { requiresAuth: false }
    },
    {
      path: '/auth/signup',
      component: AuthSignUp,
      name: 'AuthSignUp',
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  try {
    if (to.matched[to.matched.length - 1].meta.requiresAuth === false) {
      if (localStorage.getItem('ACCESS_TOKEN')) {
        next({path: '/news-feed'})
      } else {
        next()
      }
    } else if (to.matched[to.matched.length - 1].meta.requiresAuth === true) {
      if (localStorage.getItem('ACCESS_TOKEN')) {
        next()
      } else {
        next({path: '/news-feed'})
      }
    } else {
      next(true)
    }
  } catch (e) {
    next()
  }
})

export default router
