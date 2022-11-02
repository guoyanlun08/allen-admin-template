import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import { Message } from 'element-ui'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	const hasToken = getToken()

	if (hasToken) {
		if (to.path === '/login') {
			next({ path: '/' })
		} else {
			const hasRoles = store.getters.roles && store.getters.roles.length > 0
			if (hasRoles) {
				next()
			} else {
				try {
					const { roles } = await store.dispatch('user/getInfo')
					const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
					// 之前的 router.addRoutes 的 api 弃用（传参是数组），addRoute 传参是 对象
					router.addRoute(...accessRoutes)
					next({ ...to, replace: true })
				} catch (error) {
					// remove token and go to login page to re-login
					await store.dispatch('user/resetToken')
					Message.error(error || 'Has Error')
					next(`/login?redirect=${to.path}`)
				}
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${to.path}`)
		}
	}
})
