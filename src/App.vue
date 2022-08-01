<template>
	<v-app>

		<!-- component tag will render the current route base -->
		<component v-bind:is="base">
			<router-view></router-view>
		</component>

	</v-app>
</template>

<script>
import Hero from './components/Layouts/Hero.vue';
import Dashboard from './components/Layouts/Dashboard.vue';

export default {
	name: 'App',
	components: { Hero, Dashboard },
	computed: {
		base() {
			return this.$route.meta.base || 'hero'
		}
	}
};
</script>
