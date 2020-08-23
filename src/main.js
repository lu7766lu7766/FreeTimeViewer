import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import myPlugin from './plugin'
import 'bootstrap/dist/css/bootstrap.css'
import './css/my.styl'

Vue.use(VueI18n)
Vue.use(myPlugin)

const locale = (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage).toLowerCase()
const i18n = new VueI18n({
	locale,
	messages: {
		'zh-tw': require('./lang/zh-tw'),
		en: require('./lang/en'),
	},
})
Vue.config.productionTip = false

new Vue({
	i18n,
	render: (h) => h(App),
}).$mount('#app')
