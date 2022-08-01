<template>
    <div>
        <v-snackbar v-model="saved" color="success" top right>
            Saved!
        </v-snackbar>
        <v-card :loading="loading" flat rounded="xl">
            <v-card-title>My Profile</v-card-title>
            <v-card-text>
                <profile @submit="update" :user="user" id="profile-form" :errors="errors"/>
                <v-btn type="submit" form="profile-form" color="primary">
                    <v-icon dense class="mr-3">far fat-check-circle</v-icon>
                    Save
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import Profile from '../../components/Forms/Profile.vue';
import users from '../../repositories/users';
export default {
    components: { Profile },

    data: () => ({
        user: {},
        loading: true,
        saved: false,
        errors: [],
    }),

    mounted() {
        this.getUser()
    },

    methods: {
        getUser() {
            
            const userId = localStorage.getItem('user_id')
            if(!!userId && userId != 'null'){

                users.find(userId)
                     .then(resp => this.user = {...resp.data})
                     .catch(() => this.$router.push('/'))
                     .finally(() => this.loading = false)

            }
        },

        update(data) {

            const userId = localStorage.getItem('user_id')
            if(!!userId && userId != 'null'){
                this.loading = true
                users.update(userId, data)
                     .then(resp => {
                        this.saved = true
                     })
                     .catch(e => this.errors = [...e.response.data])
                     .finally(() => this.loading = false)

            }
        }
    }
}
</script>