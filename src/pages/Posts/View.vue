<template>
    <div class="">
        <breadcrumbs :items="breadcrumbItems" />
        <v-card :loading="loading" flat rounded="xl">

            <!-- user header -->
            <v-card-title class="p-4">
                <div class="mr-3">
                    <user-avatar :name="user.name" />
                </div>
                <p style="line-height: 1; margin: 0" v-if="!!user.id">
                    {{ user.name }} <br>
                    <small style="font-size: 12px">{{ user.email }}</small>
                </p>
            </v-card-title>
            <!-- end user header -->

            <v-card-text>

                <!-- post data -->
                <div class="row p-5">
                    <h3>{{ post.title }}</h3>
                    <p class="mt-4">{{ post.body }}</p>
                </div>
                <!-- end post data -->

                <!-- comments card -->
                <div class="row p-3">
                    <div class="col-12">
                        <h3 color="primary">Comments</h3>
                        <v-divider></v-divider>

                        <v-list v-if="!!comments.length">
                            <v-list-item v-for="(comment, i) in comments" :key="i">
                                <v-list-item-icon>
                                    <user-avatar :name="comment.name" :size="30" />
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ comment.name }}
                                        <small>{{ comment.email }}</small>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>{{ comment.body }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <div v-else>
                            <p>No comments</p>
                        </div>
                    </div>
                </div>
                <!-- end comments card -->

                <!-- new comment form -->
                <v-card flat outlined :disabled="loading">
                    <v-card-text>
                        <v-form @submit.prevent="sendComment">
                            <div class="row">
                                <div class="col-md-6">
                                    <v-text-field dense outlined label="Your Name" v-model="comment.name"
                                        :error-messages="errorMessageHandle('name')" />
                                </div>
                                <div class="col-md-6">
                                    <v-text-field dense outlined label="Your E-mail" type="email"
                                        v-model="comment.email" :error-messages="errorMessageHandle('email')" />
                                </div>
                                <div class="col-12">
                                    <v-textarea outlined dense label="Add a comment" placeholder="Your message here!"
                                        v-model="comment.body" rows="3" :error-messages="errorMessageHandle('body')" />
                                </div>
                                <div class="col-12">
                                    <v-btn type="submit" :loading="sending" color="primary">
                                        <v-icon dense class="mr-3">far fa-paper-plane</v-icon>
                                        Send
                                    </v-btn>
                                </div>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
                <!-- end new comment form -->

            </v-card-text>
        </v-card>
    </div>
</template>
<script>

import posts from '../../repositories/posts'
import PostForm from '../../components/Forms/PostForm.vue'
import comments from '../../repositories/comments'
import users from '../../repositories/users'
import Breadcrumbs from '../../components/Breadcrumbs.vue'
import UserAvatar from '../../components/UserAvatar.vue'
import AsideMenu from '../../components/AsideMenu.vue'
export default {
    components: { PostForm, Breadcrumbs, UserAvatar, AsideMenu },
    data: () => ({
        loading: false,
        sending: false,
        post: {},
        comments: [],
        comment: {},
        user: {},
        errors: [],
        breadcrumbItems: [
            { text: 'Posts', to: '/' }
        ]
    }),

    mounted() {
        this.getPost()
        this.listComments()
    },

    methods: {

        /**
         * get post comments
         */
        listComments() {
            comments.listByPostId(this.$route.params.id)
                .then(resp => this.comments = [...resp.data])
        },

        /**
         * search for the author of the post
         * 
         * the api doesn't bring it along, so I brought it in another request
         */
        getPostUser(userId) {
            users.find(userId)
                .then(resp => this.user = { ...resp.data })
        },

        /**
         * find post
         */
        getPost() {

            // param in url
            if (!this.$route.params.id)
                this.$router.push('/my-posts')

            this.loading = true
            posts.find(this.$route.params.id)
                .then(resp => {
                    this.post = { ...resp.data }
                    this.loading = false

                    // if user exists, find it
                    if (resp.data.user_id)
                        this.getPostUser(resp.data.user_id)
                })
                .catch(e => {

                    // back to home if error
                    return this.$router.push('/')
                })
        },

        /**
         * send a comment
         */
        sendComment() {
            this.errors = []
            this.sending = true
            comments.create(this.post.id, this.comment)
                .then(() => {

                    // search for the comments again
                    this.listComments()
                    this.comment = {}
                })
                .catch(e => this.errors = [...e.response.data])
                .finally(() => this.sending = false)
        },

        /**
         * format error messages to fields
         */
        errorMessageHandle(field) {
            return this.errors.filter(e => e.field == field)
                .map(e => e.message)
        },
    }
}
</script>