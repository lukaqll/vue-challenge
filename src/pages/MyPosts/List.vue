<template>
    <div class="row w-100">
        <div class="col-12">
            <v-card :loading="loading" flat rounded="xl">
                <v-card-title class="w-100 justify-content-between">
                    My Posts
                    <v-btn color="primary" outlined to="/my-posts/create">New Post</v-btn>
                </v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item
                                v-for="(item, i) in posts"
                                :key="i"
                                three-line
                                :to="`/my-posts/${item.id}`"
                                :selectable="false"
                            >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                    <v-list-item-subtitle>{{item.body}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-list-item-action-text>
                                        <v-icon>mdi-menu</v-icon>
                                    </v-list-item-action-text>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
<script>

import posts from '../../repositories/posts'
export default {
    data(){
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
            if(!this.$useStore.user){
                this.$router.push('/posts')
                return
            }

            posts.my( this.$useStore.user.id )
                 .then(resp => this.posts = [...resp.data])
                 .finally(() => this.loading = false)
        },
    }
}
</script>