<template>
    <div class="row w-100 justify-center">
        <div class="col-10">
            <v-card :loading="loading" flat rounded="xl">
                <v-card-title>Novo Post</v-card-title>
                <v-card-text>
                    <post-form
                        id="create-form"
                        :errors="errors"
                        @submit="createPost"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn to="/my-posts">Back</v-btn>
                    <v-btn color="primary" type="submit" form="create-form">Post</v-btn>
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
        errors: [],
        loading: false,
    }),

    methods: {

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