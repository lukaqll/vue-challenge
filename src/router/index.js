import Vue from 'vue'
import VueRouter from 'vue-router'
import PostsList from '../pages/Posts/List.vue'
import MyPostList from '../pages/MyPosts/List.vue'
import PostsCreate from '../pages/MyPosts/Create.vue'
import PostsUpdate from '../pages/MyPosts/Update.vue'
import PostsView from '../pages/MyPosts/View.vue'
import DetailPostsView from '../pages/Posts/View.vue'
import Login from '../pages/Auth/Login.vue'
import users from '../repositories/users'

// function page (path) {
//   return () => import(`./../pages/${path}`).then(m => m.default || m)
// }

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [

    /**
     * auth
     */
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
    /**
     * posts views
     */
    {
      path: '/',
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

router.beforeResolve( async (to, from, next) => {
  
  if(to.name == from.name){
      return next() 
  }

  const userId = localStorage.getItem('user_id')

  if(!!userId){
    users.find(userId)
         .then(async resp => {
              await Vue.prototype.$useStore.setUser(resp.data)
         })
         .catch( async e => {
              localStorage.setItem('user_id', null)
              await Vue.prototype.$useStore.setUser(null)
         })
         .finally(() => next())

  } else {

    return next()
  }

})
export default router
