<template>
	<div :class="['text-xs-center', 'middle-box', $vuetify.breakpoint.width > 500 ? ['elevation-12', 'mt-5'] : '' ]" transition="scale-transition" origin="center center">
		<div>
			<div>
				<h1 class="logo-name">IFAN</h1>
			</div>
			<h3 style="color: #378FB0">Bem vindo a IFAN</h3>
        <p style="color: #378FB0">Administração de Projetos e Assistidos.
        </p>
        <p style="color: #378FB0">Faça login e experimente.</p>
        <v-form class="mr-4 ml-4 mb-5 mt-0" v-model="valid" ref="form" lazy-validation @submit.prevent="submit">
        	<v-text-field
		        label="E-mail"
		        v-model="email"
		        :rules="emailRules"
		        required
		    />
		    <v-text-field
				label="Senha"
				hint="Pelo menos 6 caracteres."
				v-model="password"
				min="6"
				:rules="passwordRules"
				:append-icon="e1 ? 'visibility' : 'visibility_off'"
				:append-icon-cb="() => (e1 = !e1)"
				:type="e1 ? 'password' : 'text'"
				counter
				required
			/>
			<div class="centerCaptcha">
				<captcha
				style="width:168px; text-align:center"
					v-model="captcha"
					required color="#378FB0"
					:callSuccess="captchaRules"></captcha>
				<v-btn
					style="width:90px; margin-top:15px"
					type="submit"
					color="primary"
					:disabled="!valid || !captcha" >
					Entrar
				</v-btn>
			</div>
			<v-container grid-list-sm text-xs-center style="margin-top:15px;margin-botton: 15px;">
				<v-layout row wrap>
					<v-flex xs6>
						<router-link :to="{name: 'novoacesso.index'}">Novo Acesso?</router-link>
					</v-flex>
					<v-flex xs6>
						<router-link :to="{name: 'resetsenha.index'}">Esqueceu a senha?</router-link>
					</v-flex>
				</v-layout>
			</v-container>
        </v-form>
        <span style="color: #378FB0; margin-botton: 60px;"><small>IFAN - sistemaifan@gmail.com &copy; 2018</small></span>
		</div>
	</div>
</template>

<script>
import http from '@/service/http'
import localforage from 'localforage'
import vueCaptcha from 'vue-captcha'
import { bus } from '@/plugins/event-bus'
export default {
	name: 'Authentication',
	data: () => ({
		valid: false,
		email: '',
		emailRules: [
			(v) => !!v || 'E-mail é obrigatório',
			(v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail inválido.'
		],
		password: '',
		passwordRules: [
			(v) => !!v || 'Senha é obrigatória',
			(v) => (v && v.length >= 6) || 'Pelo menos 6 caracteres.'
		],
		captcha: false,
		e1: true
	}),
	methods: {
		captchaRules () {
			this.captcha = true
		},
		async submit () {
			if (!this.captcha) {
				bus.$emit('display-alert', {
					type: 'error',
					message: 'Verifique o captcha.'
				})
			} else {
				const { email, password } = this
				const response = await http.post('/auth/users', {email, senha: password})
				if (response.status === 200) {
					const token = response.headers['x-access-token']
					localforage.setItem('token', token).then(() => {
						this.$router.push({name: 'dashboard.index'})
						bus.$emit('config-user', { token }) 
						bus.$emit('display-alert', {
							type: 'success',
							message: 'Bem vindo!'
						})
					})
				} else {
					bus.$emit('display-alert', {
						type: 'error',
						message: 'Verifique o login e/ou senha.'
					})
				}
			}
		}
	},
	components: {
		'captcha': vueCaptcha
	}
}
</script>

<style scoped>
.centerCaptcha {
    margin: auto;
    width: 185px;
}
.left {
    margin: auto;
    width: 400px;
}
.middle-box {
	max-width: 400px;
	z-index: 100;
	margin: 0 auto;
	height: 650px;
}
.middle-box h1 {
	font-size: 100px;
}
@media (max-width: 768px) {
	.middle-box {
		padding-top: 0px;
	}
}
.wrapper .middle-box {
	margin-top: 140px;
}
.logo-name {
  color: #378FB0;
  font-weight: 800;
  letter-spacing: -10px;
  margin-bottom: 0;
}
h3 {
	font-weight: 100;
	font-size: 16px;
	margin-top: 5px;
  font-weight: 600;
}

</style>