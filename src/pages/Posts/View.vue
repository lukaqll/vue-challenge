<template>
    <div class="row w-100 justify-center">
        <div class="col-10">
            <v-card :loading="loading" flat rounded="xl">
                <v-card-title>
                    <v-avatar color="primary lighten-1" small class="mr-3">
                        <v-icon>mdi-account</v-icon>
                    </v-avatar>
                    <p style="line-height: 1; margin: 0">
                        {{user.name}} <br>
                        <small style="font-size: 12px">{{user.email}}</small>
                    </p>
                </v-card-title>
                <v-card-text>
                    <h2>{{post.title}}</h2>
                    <div class="row">
                        <div class="col-12">
                            <v-card flat outlined>
                                <v-card-text>
                                    <p>{{post.body}}</p>
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <h3>Comments</h3>
                            <v-divider></v-divider>

                            <v-list v-if="!!comments.length">
                                <v-list-item
                                    v-for="(comment, i) in comments" :key="i"
                                >
                                    <v-list-item-icon>
                                        <v-avatar color="primary lighten-2" size="30">
                                            <v-icon dense>mdi-account</v-icon>
                                        </v-avatar>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{comment.name}}
                                            <small>{{comment.email}}</small>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>{{comment.body}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <div v-else>
                                <p>No comments</p>
                            </div>
                        </div>
                    </div>

                    <v-card flat outlined :disabled="loading">
                        <v-card-text>
                            <v-form @submit.prevent="sendComment">
                                <div class="row">
                                    <div class="col-md-6">
                                        <v-text-field 
                                            dense outlined label="Your Name" 
                                            v-model="comment.name"
                                            :error-messages="errorMessageHandle('name')"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <v-text-field 
                                            dense outlined label="Your E-mail" type="email" 
                                            v-model="comment.email"
                                            :error-messages="errorMessageHandle('email')"
                                        />
                                    </div>
                                    <div class="col-12">
                                        <v-textarea
                                            outlined dense
                                            label="Add a comment"
                                            placeholder="Your message here!"
                                            v-model="comment.body" rows="3"
                                            :error-messages="errorMessageHandle('body')"
                                        />
                                    </div>
                                    <div class="col-12">
                                        <v-btn type="submit" :loading="sending">
                                            Send
                                        </v-btn>
                                    </div>
                                </div>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
<script>

import posts from '../../repositories/posts'
import PostForm from '../../components/Forms/PostForm.vue'
import comments from '../../repositories/comments'
import users from '../../repositories/users'
export default {
    components: {PostForm},
    data: () => ({
        loading: false,
        sending: false,
        post: {},
        comments: [],
        comment: {},
        user: {},
        errors: []
    }),

    mounted() {
        this.getPost()
        this.getComments()
    },

    methods: {

        getComments() {
            comments.listByPostId(this.$route.params.id)
                    .then(resp => this.comments = [...resp.data])
        },

        getPostUser(userId) {
            users.find(userId)
                    .then(resp => this.user = {...resp.data})
        },

        getPost() {
            if(!this.$route.params.id)
                this.$router.push('/my-posts')

            this.loading = true
            posts.find(this.$route.params.id)
                 .then(resp => {
                    this.post = {...resp.data}
                    if(resp.data.user_id)
                        this.getPostUser(resp.data.user_id)
                 })
                 .finally(() => this.loading = false)
        },

        sendComment() {
            this.errors = []
            this.sending = true
            comments.create(this.post.id, this.comment)
                    .then(() => {
                        this.getComments()
                        this.comment = {}
                    })
                    .catch(e => this.errors = [...e.response.data])
                    .finally(() => this.sending = false)
        },

        errorMessageHandle(field) {
            return this.errors.filter(e => e.field == field)
                              .map(e => e.message)
        },
    }
}
</script>