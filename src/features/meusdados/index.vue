<template>
<div id="app">
  	<v-app id="inspire">
		<header-feature title="Editar perfil" />
		<div class="form">
			<v-form  ref="form" v-model="valid" lazy-validation @submit.prevent="submit" >
				<v-text-field							
					label="Nome completo"
					v-model="usuario.nome"							
				/>
				<v-text-field
					label="CPF"
					v-model="usuario.cpf"							
					readonly
					disabled
				/>
				<v-text-field
					label="E-mail"
					v-model="usuario.email"							
					readonly
					disabled
				/>
				<v-text-field
					label="Nova senha"
					hint="Pelo menos 6 caracteres."
					v-model="usuario.password"
					min="6"
					:rules="passwordRules"
					:append-icon="e1 ? 'visibility' : 'visibility_off'"
					:append-icon-cb="() => (e1 = !e1)"
					:type="e1 ? 'password' : 'text'"
					counter
					required
				/>
				<v-btn
					style="margin-top:15px"
					type="submit"
					color="primary"
					:disabled="!valid" >
					Alterar senha
				</v-btn>
			</v-form>
		</div>
	</v-app>
</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { bus } from '@/plugins/event-bus'
	import headerFeature from '@/components/header-feature'
	import helper from '@/helper/helper'

	export default {
		name: 'meusDados',
		data: () => ({
			valid: false,
			e1: true,
			usuario: {},
			passwordRules: [
				(v) => !!v || 'Senha é obrigatória',
				(v) => (v && v.length >= 6) || 'Pelo menos 6 caracteres.'
			]	
		}),
		async mounted () {
			this.usuario = await helper.parseToken()
		},
		watch: {
			usuario (value) {
				this.setUsuario(this.usuario)
			}
		},
		methods: {
			...mapActions('meusdados', ['update', 'setUsuario', 'setSenha', 'setNome']),
			submit () {		
				this.setUsuario(this.usuario)						
				this.update().then((response) => {
					if (response.status === 200) {
						helper.removeToken().then(() => {
							this.$router.push({ name: 'auth.index' })
							bus.$emit('display-alert', {
								type: 'info',
								message: 'Dados atualizados com sucesso!'
							})
						})	
					}
				})
			}
		},
		components: {
			headerFeature
		}
	}
</script>

<style scoped>
.form {
	background-color: #fff; 
	padding: 0px 20px 20px 20px;
}
@media only screen and (min-width: 600px) {
	.form {
		padding: 5px 50px 50px 50px;
	}
}
</style>
