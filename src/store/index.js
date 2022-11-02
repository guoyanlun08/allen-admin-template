import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modules = {}

function importAll(r) {
	r.keys().forEach((modulePath) => {
		const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
		modules[moduleName] = r(modulePath).default
	})
}

importAll(require.context('./modules', true, /\.js$/))

export default new Vuex.Store({
	getters,
	modules,
})
