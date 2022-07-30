<template>
    <div class="row w-100 justify-center">
        <div class="col-10">
            <v-card :loading="loading" flat rounded="xl">
                <v-card-title>{{post.title}}</v-card-title>
                <v-card-text>
                    <v-card flat outlined>
                        <v-card-text>
                            <p>{{post.body}}</p>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-btn to="/my-posts">Voltar</v-btn>
                    <v-btn color="error" @click="deletePost">
                        <v-icon>mdi-trash</v-icon>
                        Delete
                    </v-btn>
                    <v-btn color="primary" :to="`/my-posts/${post.id}/update`" >
                        <v-icon>mid-edit</v-icon>
                        Edit Post
                    </v-btn>
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
        loading: false,
        post: {}
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