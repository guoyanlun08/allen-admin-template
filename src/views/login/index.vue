<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" class="login-form">
			<div class="title">allen-template</div>
			<el-form-item>
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input v-model="loginForm.username"></el-input>
			</el-form-item>
			<el-form-item>
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input v-model="loginForm.password" type="password"></el-input>
			</el-form-item>
			<el-button type="primary" class="login-btn" @click="handleLogin">Login</el-button>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loginForm: {
				username: 'admin',
				password: '123456',
			},
			redirect: undefined,
		}
	},
	watch: {
		$route: {
			handler: function (route) {
				this.redirect = route.query && route.query.redirect
			},
			immediate: true,
		},
	},
	methods: {
		handleLogin() {
			this.$store.dispatch('user/login', this.loginForm).then(() => {
				this.$router.push({ path: this.redirect || '/' })
			})
		},
	},
}
</script>

<style lang="scss">
.login-container {
	.el-input {
		display: inline-block;
		width: 85%;
		input {
			background: transparent;
			border: 0px;
			color: #fff;
			height: 47px;
		}
	}
	.el-form-item__content {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$background-color: rgb(98, 15, 176);
$dark_gray: #889aa4;

.login-container {
	width: 100%;
	min-height: 100%;
	background: $background-color;
	overflow: hidden;
	.login-form {
		width: 520px;
		margin: auto;
		padding: 160px 35px 0;
		.title {
			text-align: center;
			color: #fff;
			font-size: 32px;
			margin-bottom: 30px;
		}
		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
		}
		.login-btn {
			width: 100%;
			background: #0cd5ddf5;
		}
	}
}
</style>
