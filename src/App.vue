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
			<v-app-bar-title>Vue Challenge</v-app-bar-title>

			<v-tabs align-with-title>
				<v-tab to="/posts">Posts</v-tab>
				<v-tab to="/my-posts">My Posts</v-tab>
			</v-tabs>
			<v-spacer></v-spacer>

			<v-btn
				href="https://github.com/vuetifyjs/vuetify/releases/latest"
				target="_blank"
				text
			>
				<span class="mr-2">Latest Release</span>
				<v-icon>mdi-open-in-new</v-icon>
			</v-btn>
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

  data: () => ({
    //
  }),
};
</script>
