import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import vuetify from './plugins/vuetify'
import { useStore } from './services/store'

const pinia = createPinia()
Vue.use(PiniaVuePlugin)
Vue.use(pinia)
Vue.prototype.$useStore = useStore()

Vue.mixin({
	data: () => ({
		mainLoader: false,
	})
})

new Vue({
	router,
	vuetify,
	render: (h) => h(App)
}).$mount('#app')
