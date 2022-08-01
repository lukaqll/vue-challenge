import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify);

// verify dark mode and set it
const isDark = localStorage.getItem('darkmode') == '1' ? true : false

export default new Vuetify({
    theme: {
        dark: isDark
    }
});
