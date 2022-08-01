<template>
    <div>
        <breadcrumbs :items="breadcrumbItems" />
        <v-card :loading="loading" flat rounded="xl">
            <v-card-title>{{ $route.meta.title }}</v-card-title>
            <v-card-text>
                <post-form id="create-form" :errors="errors" @submit="createPost" />
                <v-btn color="primary" type="submit" form="create-form">
                    <v-icon dense class="mr-3">far fa-check-circle</v-icon>
                    Post
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>

import posts from '../../repositories/posts'
import PostForm from '../../components/Forms/PostForm.vue'
import Breadcrumbs from '../../components/Breadcrumbs.vue'
export default {
    components: { PostForm, Breadcrumbs },
    data: () => ({
        errors: [],
        loading: false,
        breadcrumbItems: [
            { text: 'My Posts', to: '/my-posts' }
        ]
    }),

    methods: {

        /**
         * create post
         */
        createPost(post) {
            this.loading = true
            this.errors = []
            posts.create(this.$useStore.user.id, post)
                .then(resp => {
                    this.$router.push('/my-posts')
                })
                .catch(e => {
                    this.errors = [...e.response.data]
                    this.loading = false
                })
        },
    }
}
</script>