<template>
    <div>
        <breadcrumbs :items="breadcrumbItems" />
        <v-card :loading="loading" flat rounded="xl">
            <v-card-title>{{ $route.meta.title }}</v-card-title>
            <v-card-text>
                <post-form v-if="!!post" id="update-form" :errors="errors" :post="post" @submit="updatePost" />
                <v-btn color="primary" type="submit" form="update-form">
                    <v-icon dense class="mr-3">far fa-check-circle</v-icon>
                    Save
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
        post: {},
    }),

    computed: {
        breadcrumbItems() {
            return [
                { text: 'My Posts', to: '/my-posts' },
                { text: `Post`, to: `/my-posts/${this.$route.params.id}` }
            ]
        }
    },

    mounted() {
        this.getPost()
    },

    methods: {

        updatePost(post) {
            this.loading = true
            this.errors = []
            posts.update(this.post.id, post)
                .then(resp => {
                    this.$router.push('/my-posts')
                })
                .catch(e => this.errors = [...e.response.data])
                .finally(() => this.loading = false)
        },

        getPost() {
            if (!this.$route.params.id)
                this.$router.push('/my-posts')

            this.loading = true
            posts.find(this.$route.params.id)
                .then(resp => this.post = { ...resp.data })
                .finally(() => this.loading = false)

        }
    }
}
</script>