<template>
	<v-app>
		<v-app-bar
			app
			fixed
			elevation="md"
			hide-on-scroll
			class="pt-0"
			dark
		>
			<router-link
				is="v-app-bar-title"
				to="/"
			>
				Vue Challenge
			</router-link>

			<v-tabs align-with-title>
				<v-tab 
					to="/my-posts"
					v-if="$useStore.user"
				>My Posts</v-tab>
			</v-tabs>
			<v-spacer></v-spacer>

			<v-btn
				to="/login"
				text
				v-if="!$useStore.user"
			>
				Sign in
			</v-btn>
			<v-btn v-else @click="logout" text>Log Out</v-btn>
		</v-app-bar>
		
		<v-main app>
            <v-container>
                <div class="d-flex justify-content-center w-100">
					<v-layout class="main-wrap">
                    	<router-view/>
					</v-layout>
                </div>
            </v-container>
        </v-main>
	</v-app>
</template>

<script>

export default {
  name: 'App',
  
  methods: {
	  logout() {
		  localStorage.removeItem('user_id')
		  this.$useStore.setUser(null).then(() => {
			  if(this.$route.path != '/post')
			  	this.$router.push('/posts')
		  })
	  }
  }
};
</script>
