import Vue from 'vue'
import VueRouter from 'vue-router'
import PostsList from '../pages/Posts/List.vue'
import MyPostList from '../pages/MyPosts/List.vue'
import PostsCreate from '../pages/MyPosts/Create.vue'
import PostsUpdate from '../pages/MyPosts/Update.vue'
import PostsView from '../pages/MyPosts/View.vue'
import DetailPostsView from '../pages/Posts/View.vue'
import Signin from '../pages/Auth/Signin.vue'
import users from '../repositories/users'

import E404 from '../pages/Errors/E404.vue'
import E403 from '../pages/Errors/E403.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: import.meta.env.BASE_URL,
	routes: [

		{
			path: '*',
			name: '404',
			component: E404,
			meta: { base: 'hero' }
		},
		{
			path: '/unauthorized',
			name: '403',
			component: E403,
			meta: { base: 'hero' }
		},

		/**
		 * auth
		 */
		{
			path: '/login',
			name: 'login',
			component: Signin,
			meta: { base: 'dashboard' }
		},

		/**
		 * posts views
		 */
		{
			path: '/',
			name: 'posts',
			exact: true,
			component: PostsList,
			meta: {
				base: 'dashboard',
				title: 'Posts'
			}
		},
		{
			path: '/posts/:id',
			name: 'posts.view',
			component: DetailPostsView,
			meta: {
				base: 'dashboard',
				title: 'Post View'
			}
		},

		/**
		 * posts CRUD
		 */
		{
			path: '/my-posts',
			name: 'my_posts.list',
			component: MyPostList,
			meta: {
				base: 'dashboard',
				title: 'My Posts',
				auth: true
			}
		},
		{
			path: '/my-posts/create',
			name: 'my_posts.create',
			component: PostsCreate,
			meta: {
				base: 'dashboard',
				title: 'New Post',
				auth: true
			}
		},
		{
			path: '/my-posts/:id',
			name: 'my_posts.view',
			component: PostsView,
			meta: {
				base: 'dashboard',
				title: 'Post',
				auth: true
			}
		},
		{
			path: '/my-posts/:id/update',
			name: 'my_posts.update',
			component: PostsUpdate,
			meta: {
				base: 'dashboard',
				title: 'Update Post',
				auth: true
			}
		}
	]
})

/**
 * always run when navigate
 */
router.beforeResolve(async (to, from, next) => {

	if (to.name == from.name) {
		return next()
	}

	// logged user id
	const userId = localStorage.getItem('user_id')

	if (!!userId) {

		// main loader
		router.app.mainLoader = true

		// find user on API
		// logout if not exists
		users.find(userId)
			.then(async resp => {
				await Vue.prototype.$useStore.setUser(resp.data)
			})
			.catch(async e => {
				localStorage.setItem('user_id', null)
				await Vue.prototype.$useStore.setUser(null)
			})
			.finally(() => {
				setTimeout(() => router.app.mainLoader = false, 100)
				return next()
			})

	} else {

		// verify if is logged
		if(to.meta.auth === true){
			if(from.path != '/login')
				return router.push('/login')
		} else {
			return next()
		}
	}

})
export default router
