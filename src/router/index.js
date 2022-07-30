import Vue from 'vue'
import VueRouter from 'vue-router'
import PostsList from '../pages/Posts/List.vue'
import MyPostList from '../pages/MyPosts/List.vue'
import PostsCreate from '../pages/MyPosts/Create.vue'
import PostsUpdate from '../pages/MyPosts/Update.vue'
import PostsView from '../pages/MyPosts/View.vue'
import DetailPostsView from '../pages/Posts/View.vue'

// function page (path) {
//   return () => import(`./../pages/${path}`).then(m => m.default || m)
// }

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: page('HomeView')
    // },
    
    /**
     * posts views
     */
    {
      path: '/posts',
      name: 'posts',
      component: PostsList
    },
    {
      path: '/posts/:id',
      name: 'posts.view',
      component: DetailPostsView
    },

    /**
     * posts CRUD
     */
    {
      path: '/my-posts',
      name: 'my_posts.list',
      component: MyPostList
    },
    {
      path: '/my-posts/create',
      name: 'my_posts.create',
      component: PostsCreate
    },
    {
      path: '/my-posts/:id',
      name: 'my_posts.view',
      component: PostsView
    },
    {
      path: '/my-posts/:id/update',
      name: 'my_posts.update',
      component: PostsUpdate
    }
  ]
})

export default router
