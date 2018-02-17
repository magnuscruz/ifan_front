<template>
	<div :class="['text-xs-center', 'middle-box', $vuetify.breakpoint.width > 500 ? ['elevation-4', 'mt-5'] : '' ]" transition="scale-transition" origin="center center">
		<div>
			<div>
				<h1 class="logo-name">IFAN</h1>
			</div>
			<h3 style="color: #378FB0">Bem vindo a IFAN</h3>
        <p style="color: #378FB0">Preencha os dados abaixo e faça sua solicitanção de recuperação de senha.</p>
        <v-form class="mr-4 ml-4 mb-5 mt-0" v-model="valid" ref="form" lazy-validation @submit.prevent="submit">
        	<v-text-field
		        label="Nome Completo"
		        v-model="nome"
		        :rules="nomeRules"
		        required
		    />
			<v-text-field
		        label="CPF"
		        v-model="cpf"
		        :rules="cpfRules"
		        required
		    />
			<v-text-field
		        label="E-mail"
		        v-model="email"
		        :rules="emailRules"
		        required
		    />
			<div class="centerCaptcha">
				<captcha
					style="width:168px; text-align:center"
					v-model="captcha"
					required color="#378FB0" 
					:callSuccess="captchaRules"></captcha>
			</div>
			<v-container grid-list-sm text-xs-center style="margin-top:15px;">
				<v-layout row wrap>
					<v-flex xs6>
					<v-btn outline color="primary" @click="voltar">Voltar</v-btn>
					</v-flex>
					<v-flex xs6>
					<v-btn
						type="submit"
						color="primary"
						:disabled="!valid || !captcha" >
						Solicitar
					</v-btn>
					</v-flex>
				</v-layout>
			</v-container>				
        </v-form>
        <span style="color: #378FB0; margin-botton: 15px;"><small>IFAN - sistemaifan@gmail.com &copy; 2018</small></span>
		</div>
	</div>
</template>

<script>
import http from '@/service/http'
import vueCaptcha from 'vue-captcha'
import { bus } from '@/plugins/event-bus'
export default {
	name: 'Authentication',
	data: () => ({
		valid: true,
		nome: '',
		nomeRules: [
			(v) => !!v || 'Nome é obrigatório',
			(v) => (v && v.length >= 10) || 'Pelo menos 10 caracteres.'
		],
		cpf: '',
		cpfRules: [
			(v) => !!v || 'Cpf é obrigatório',
			(v) => (v && v.length <= 11) || 'Menos que 11 caracteres.'
		],
		email: '',
		emailRules: [
		(v) => !!v || 'E-mail é obrigatório',
		(v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail inválido.'
		],
		captcha: false,
    	e1: true
	}),
	methods: {
		captchaRules () {
			this.captcha = true
		},
		voltar () {
			this.$router.go(-1)
		},
		async submit () {
			if (!this.captcha) {
				bus.$emit('display-alert', {
					type: 'error',
					message: 'Verifique o captcha.'
				})
			} else {
				const {nome, cpf, email} = this
				const response = await http.put('/auth/users/reset', {nome, cpf, email})
				if (response.status === 200) {
					bus.$emit('display-alert', {
						type: 'success',
						message: 'Solicitação realizada! Aguarde o email com a nova senha.'
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
    width: 168px;
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