<template>
<div class="w-100">
	<div class="w-100 d-flex justify-center">

		<v-card v-if="posts.length" flat rounded="xl" class="w-100">
			<v-card-text>
				<v-list>
					<v-list-item
						v-for="(item, i) in posts"
						:key="i"
						three-line
					>
						<v-list-item-content>
							<v-list-item-title  color="primary">
								<router-link :to="`/posts/${item.id}`">
									<b>{{item.title}}</b>
								</router-link>
							</v-list-item-title>
							<v-list-item-subtitle>{{item.body}}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
		<div class="mt-5" v-else>
			<loader/>
		</div>
			
	</div>
</div>
</template>
<script>

import posts from '../../repositories/posts'
import Loader from '../../components/Loader.vue'
export default {
    components: {Loader},
    data: () => ({
        posts: [],
		loading: true
    }),

    mounted(){
      this.listAllPosts()
    },

    methods: {

        /**
         * list all posts from API
         */
        listAllPosts() {
            posts.all()
				 .then(resp => this.posts = [...resp.data])    
				 .finally(() => this.loading = false)
				 

        }
    }
}
</script>