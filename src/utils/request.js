import store from '@/store'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const baseURL = process.env.VUE_APP_BASE_API

const service = axios.create({
	baseURL,
	timeout: 5000,
})

service.interceptors.request.use(
	(config) => {
		if (store.getters.token) {
			config.headers['X-token'] = getToken()
		}
		return config
	},
	(error) => {
		console.log(error)
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(response) => {
		const res = response.data

		if (res.code !== 200) {
			Message({
				message: res.message || 'Error',
				type: 'error',
				duration: 5 * 1000,
			})

			// 508: 非法 token; 512: 其他客户端登录; 50014: Token 过期;
			if (res.code === 508 || res.code === 512 || res.code === 514) {
				MessageBox.confirm('你需要退出登录,你可以点击取消停留在本页,或者重新登录', '确认退出', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					store.dispatch('user/resetToken').then(() => {
						location.reload()
					})
				})
			}
		} else {
			return res
		}
	},
	(error) => {
		console.log('err' + error) // for debug
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000,
		})
		return Promise.reject(error)
	}
)

export default service
