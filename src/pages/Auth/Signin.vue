<template>
    <div class="row justify-center">
        <div class="col-md-10">
            <v-card flat rounded="xl">
                <v-card-title>Sign In</v-card-title>
                <v-card-text>
                    <profile @submit="register" id="register" :errors="errors"></profile>
                    <v-btn color="primary" type="submit" form="register" block :loading="loading">Register</v-btn>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>

import { useStorage } from '@vueuse/core'
import users from '../../repositories/users'
import Profile from '../../components/Forms/Profile.vue'
export default {
    components: { Profile },

    data: () => ({
        errors: [],
        loading: false
    }),

    methods: {

        /**
         * create an user on API
         */
        register(data) {

            // active as default
            data.status = 'active'
            
            this.loading = true

            users.create(data)
                .then(resp => {
                    localStorage.setItem('user_id', resp.data.id)
                    this.$useStore.setUser(resp.data).then(() => {
                        this.$router.push('/')
                    })
                })
                .catch(e => this.errors = [...e.response.data])
                .finally(() => this.loading = false)
        }
    }
}
</script>