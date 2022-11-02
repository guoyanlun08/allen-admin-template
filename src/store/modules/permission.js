import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(route, roles) {
	if (route.meta && route.meta.roles) {
		return roles.some((role) => route.meta.route.includes(role))
	} else {
		return true
	}
}

export function filterAsyncRoutes(routes, roles) {
	const res = []

	routes.forEach((route) => {
		const tmp = { ...route }
		if (hasPermission(tmp, roles)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles)
			}
			res.push(tmp)
		}
	})
	return res
}

const state = {
	routes: [],
	addRoutes: [],
}

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.addRoutes = routes
		state.routes = constantRoutes.concat(routes)
	},
}

const actions = {
	generateRoutes({ commit }, roles) {
		return new Promise((reslove) => {
			let accessRoutes
			if (roles.includes('admin')) {
				accessRoutes = asyncRoutes || []
			} else {
				accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
			}
			commit('SET_ROUTES', accessRoutes)
			reslove(accessRoutes)
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
