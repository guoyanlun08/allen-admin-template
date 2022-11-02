import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'

const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		avatar: '',
		roles: [],
		introduction: '',
	}
}

const state = getDefaultState()

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction
	},
}

const actions = {
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		return new Promise((reslove, reject) => {
			login({ username, password })
				.then((res) => {
					const { data } = res
					commit('SET_TOKEN', data.token)
					setToken(data.token)
					reslove()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	getInfo({ commit, state }) {
		return new Promise((reslove, reject) => {
			getInfo(state.token)
				.then((res) => {
					const { data } = res
					if (!data) {
						reject('验证失败,请重新登录')
					}
					const { roles, name, avatar, introduction } = data
					commit('SET_ROLES', roles)
					commit('SET_NAME', name)
					commit('SET_AVATAR', avatar)
					commit('SET_INTRODUCTION', introduction)
					reslove(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	resetToken({ commit }) {
		return new Promise((resolve) => {
			removeToken()
			commit('RESET_STATE')
			resolve()
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
