<template>
	<div>
		<v-app-bar app fixed hide-on-scroll class="app-bar" color="white" elevation="0">
			<v-spacer></v-spacer>

			<v-app-bar-title>
				<v-img width="100" src="/images/blog_logo.gif"></v-img>
			</v-app-bar-title>

			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main app>
			<v-container fluid>
				<v-layout class="main-wrap">
					<div class="row w-100 justify-center">
						<div class="col-md-12 col-lg-9 col-xl-8 col-sm-12 col-xs-12">
							<div class="row">
								<div class="col-md-3">
									<aside-menu />
								</div>
								<div class="col-md-9">
									<div v-if="$router.app.mainLoader" class="mt-15 w-100 d-flex justify-center">
										<loader />
									</div>
									<slot v-else />
								</div>
							</div>
						</div>
					</div>
				</v-layout>
			</v-container>
		</v-main>
	</div>
</template>

<script>
import DarkmodeSwitch from '../DarkmodeSwitch.vue';
import Loader from '../Loader.vue';
import AsideMenu from '../AsideMenu.vue';
export default {
	components: { DarkmodeSwitch, Loader, AsideMenu },
	methods: {
		logout() {
			localStorage.removeItem('user_id')
			this.$useStore.setUser(null).then(() => {
				if (this.$route.path != '/')
					this.$router.push('/')
			})
		}
	}
};
</script>
<style scoped>
.app-bar {
	z-index: 999 !important;
}
</style>
