<template>
	<div>

		<v-card flat rounded="xl">
			<v-card-text>
				<div class="row p-md-4">
					<div class="col-12 text-right">
						<div class="row">
							<div class="col-md-10">
								<v-text-field label="Search" dense outlined v-model="term" clearable>
									<template slot="prepend">
										<v-icon>fa fa-search</v-icon>
									</template>
								</v-text-field>
							</div>
							<div class="col-md-2">
								<v-btn-toggle dense>
									<v-btn icon color="primary" @click="() => setMode('list')">
										<v-icon small>fa fa-bars</v-icon>
									</v-btn>
									<v-btn icon color="primary" @click="() => setMode('block')">
										<v-icon small>fa fa-th-large</v-icon>
									</v-btn>
								</v-btn-toggle>
							</div>
						</div>
					</div>
					<div class="col-12">

						<div v-if="posts.length">

							<div class="row" v-if="mode == 'block'">
								<div class="col-md-6 d-flex" v-for="(item, i) in foundPosts" :key="i">
									<v-card class="w-100" rounded="xl">
										<v-card-text>
											<b>{{ item.title }}</b>
											<p class="mt-4">{{ item.body.substring(0, 160) }} ...</p>
											<router-link :to="`/posts/${item.id}`">
												<b>See more</b>
											</router-link>
										</v-card-text>
									</v-card>
								</div>
							</div>

							<v-list v-else>
								<v-list-item class="my-2" v-for="(item, i) in foundPosts" :key="i" three-line>
									<v-list-item-content>
										<v-list-item-title color="primary">
											<router-link :to="`/posts/${item.id}`">
												<b>{{ item.title }}</b>
											</router-link>
										</v-list-item-title>
										<v-list-item-subtitle>{{ item.body }}</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</div>

						<div class="row" v-else>
							<div :class="`col-md-${mode=='block'?6:12}`" v-for="j in 6" :key="j">
								<v-card :flat="mode!='block'" rounded="xl">
									<v-skeleton-loader
										:type="skeletonLoaderType"
										:boilerplate="false"
									></v-skeleton-loader>
								</v-card>
							</div>
						</div>
					</div>
					<div class="col-12 d-flex justify-content-center align-items-center">
						<v-btn @click="page = page - 1" :disabled="page <= 1" color="primary" icon>
							<v-icon dese>fa fa-chevron-left</v-icon>
						</v-btn>

						<v-chip-group active-class="primary--text" v-model="page">
							<v-chip :value="i" v-for="i in page" :key="i" :disabled="page == i">{{ i }}</v-chip>
						</v-chip-group>

						<v-btn @click="page = page + 1" color="primary" icon>
							<v-icon dese>fa fa-chevron-right</v-icon>
						</v-btn>
					</div>
				</div>
			</v-card-text>
		</v-card>

	</div>
</template>
<script>

import posts from '../../repositories/posts'
import Loader from '../../components/Loader.vue'
import AsideMenu from '../../components/AsideMenu.vue'
export default {
	components: { Loader, AsideMenu },
	data: () => ({
		posts: [],
		loading: true,
		term: '',
		page: 1,
		lodingPage: false,
		mode: null,
	}),

	watch: {
		page(v) {
			this.listAllPosts()
		}
	},

	mounted() {
		this.listAllPosts()
		this.verifyListMode()
	},

	computed: {

		foundPosts() {

			// build regex to filter
			const reg = new RegExp(this.term, 'g')
			const posts = [...this.posts]

			if (!this.term)
				return posts

			// filter by title or body of posts
			return posts.filter(p => {
				return (p.title.match(reg) || p.body.match(reg))
			})
		},

		skeletonLoaderType(){
			if(this.mode == 'block'){
				return 'card-heading,article'
			} else {
				return 'article, list-item-two-line'
			}
		}
	},

	methods: {

		/**
		 * list all posts from API
		 */
		listAllPosts() {
			posts.all(this.page)
				.then(resp => this.posts = [...resp.data])
				.finally(() => this.loading = false)
		},

		/**
		 * set list mode
		 */
		setMode(mode) {
			this.mode = mode
			localStorage.setItem('post-mode', mode)
		},

		/**
		 * verify selected list mode and set it
		 */
		verifyListMode(){
			const mode = localStorage.getItem('post-mode')
			this.mode = mode
			
		}
	}
}
</script>