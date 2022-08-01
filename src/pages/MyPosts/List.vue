<template>

    <v-card :loading="loading" flat rounded="xl">
        <v-card-title class="w-100 justify-content-between">
            My Posts
            <v-btn color="primary" outlined to="/my-posts/create">New Post</v-btn>
        </v-card-title>
        <v-card-text>
            <v-list v-if="!!posts.length">
                <v-list-item-group>
                    <v-list-item v-for="(item, i) in posts" :key="i" three-line :to="`/my-posts/${item.id}`"
                        :selectable="false">
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                            <v-list-item-subtitle class="pr-3">{{ item.body }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action class="m-auto">
                            <v-icon color="primary">fa fa-chevron-right</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <div v-else-if="!loading">
                <div class="row">
                    <div class="col-12 d-flex justify-center">
                        <v-img class="rounded-xl" src="/images/is_empty.png"></v-img>
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>

import posts from '../../repositories/posts'
export default {
    data() {
        return {
            posts: [],
            loading: true
        }
    },

    mounted() {
        this.listMyPosts()
    },

    methods: {

        listMyPosts() {
            if (!this.$useStore.user) {
                this.$router.push('/')
                return
            }

            posts.my(this.$useStore.user.id)
                .then(resp => this.posts = [...resp.data])
                .finally(() => this.loading = false)
        },
    }
}
</script>