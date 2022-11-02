import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '@/layout'

Vue.use(VueRouter)

// 固定路由表
export const constantRoutes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index'),
	},
	{
		path: '/',
		name: 'home',
		// component: Layout,
		component: () => import('@/views/other/index'),
	},
]

// 动态路由配置表
export const asyncRoutes = [
	{
		path: '/permission',
		// component: Layout,
		redirect: '/permission/page',
		alwaysShow: true, // will always show the root menu
		name: 'Permission',
		meta: {
			title: 'Permission',
			icon: 'lock',
			roles: ['admin', 'editor'], // you can set roles in root nav
		},
		children: [
			{
				path: 'page',
				component: () => import('@/views/permission/page'),
				name: 'PagePermission',
				meta: {
					title: 'Page Permission',
					roles: ['admin'], // or you can only set roles in sub nav
				},
			},
			{
				path: 'directive',
				component: () => import('@/views/permission/directive'),
				name: 'DirectivePermission',
				meta: {
					title: 'Directive Permission',
					// if do not set roles, means: this page does not require permission
				},
			},
			{
				path: 'role',
				component: () => import('@/views/permission/role'),
				name: 'RolePermission',
				meta: {
					title: 'Role Permission',
					roles: ['admin'],
				},
			},
		],
	},
	{
		path: '/test-permission',
		// component: Layout,
		redirect: '/test-permission',
		name: 'test-permission',
		meta: {
			title: 'Role Permission',
			roles: ['admin'],
		},
		component: () => import('@/views/test-permission/index'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: constantRoutes,
})

export default router
