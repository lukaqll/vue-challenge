<template>
    <div class="row w-100 justify-center">
        <div class="col-10">
            <v-card :loading="loading" flat rounded="xl">
                <v-card-title>Editar Post</v-card-title>
                <v-card-text>
                    <post-form
                        v-if="!!post"
                        id="update-form"
                        :errors="errors"
                        :post="post"
                        @submit="updatePost"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn to="/my-posts">Back</v-btn>
                    <v-btn color="primary" type="submit" form="update-form">Save</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
<script>

import posts from '../../repositories/posts'
import PostForm from '../../components/Forms/PostForm.vue'
export default {
    components: {PostForm},
    data: () => ({
        userId: '4916',
        errors: [],
        loading: false,
        post: null
    }),

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
            if(!this.$route.params.id)
                this.$router.push('/my-posts')

            this.loading = true
            posts.find(this.$route.params.id)
                 .then(resp => this.post = {...resp.data})
                 .finally(() => this.loading = false)

        }
    }
}
</script>