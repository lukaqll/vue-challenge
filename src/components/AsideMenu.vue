<template>
    <v-card flat rounded="xl">

        <v-card-title class="p-4" v-if="$useStore.user">
            <div class="mr-3">
                <user-avatar :name="$useStore.user.name" :size="35"/>
            </div>
            <small style="line-height: 1; margin: 0">
                {{$useStore.user.name}} <br>
                <small style="font-size: 12px">{{$useStore.user.email}}</small>
            </small>
        </v-card-title>

        <v-card-text>
            <v-list>
                <v-list-item-group>
                    <v-list-item exact to="/">
                        <v-icon dense class="mr-4">mdi-chevron-right</v-icon>
                        Home
                    </v-list-item>
                    <v-list-item exact to="/my-posts/create">
                        <v-icon dense class="mr-4">mdi-chevron-right</v-icon>
                        Submit a Post
                    </v-list-item>
                    <v-list-item exact to="/my-posts">
                        <v-icon dense class="mr-4">mdi-chevron-right</v-icon>
                        My Posts
                    </v-list-item>
                    <v-list-item exact to="/profile" v-if="!!$useStore.user">
                        <v-icon dense class="mr-4">mdi-chevron-right</v-icon>
                        My Account
                    </v-list-item>

                    <v-list-item exact v-if="!!$useStore.user" @click="logout">
                        <v-icon dense class="mr-4">fa fa-sign-out-alt</v-icon>
                        Logout
                    </v-list-item>
                    <v-list-item exact v-else to="/login">
                        <v-icon dense class="mr-4">fa fa-sign-in-alt</v-icon>
                        Sign in
                    </v-list-item>
                </v-list-item-group>
            </v-list>

            <div class="pl-4">
                <darkmode-switch/>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import DarkmodeSwitch from './DarkmodeSwitch.vue'
import UserAvatar from './UserAvatar.vue'
export default {
  components: { DarkmodeSwitch, UserAvatar },
    
    methods: {
        logout() {
			localStorage.removeItem('user_id')
			this.$useStore.setUser(null).then(() => {
				if (this.$route.path != '/')
					this.$router.push('/')
			})
		}
    }
}
</script>