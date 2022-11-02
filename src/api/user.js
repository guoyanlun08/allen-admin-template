import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/allen-template/user/login',
		method: 'POST',
		data,
	})
}

export function getInfo(token) {
	return request({
		url: '/allen-template/user/getInfo',
		method: 'GET',
		params: { token },
	})
}
