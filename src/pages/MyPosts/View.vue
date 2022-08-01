<template>
    <div>
        <breadcrumbs :items="breadcrumbItems" />
        <v-card :loading="loading" flat rounded="xl">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-text>

                <div class="row">
                    <div class="col-12">
                        <v-card flat outlined>
                            <v-card-text>
                                <p>{{ post.body }}</p>
                            </v-card-text>
                        </v-card>
                    </div>
                    <div class="col-12">
                        <v-btn color="error" class="mr-3" @click="deletePost">
                            <v-icon dense class="mr-3">fa fa-trash</v-icon>
                            Delete
                        </v-btn>
                        <v-btn color="primary" :to="`/my-posts/${post.id}/update`">
                            <v-icon dense class="mr-3">fa fa-edit</v-icon>
                            Edit Post
                        </v-btn>
                    </div>
                </div>
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
        loading: false,
        post: {},
        breadcrumbItems: [
            { text: 'My Posts', to: '/my-posts' }
        ]
    }),

    mounted() {
        this.getPost()
    },

    methods: {

        deletePost() {
            this.loading = true
            posts.delete(this.post.id)
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