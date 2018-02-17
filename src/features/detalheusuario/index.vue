<template>	
<div>
	<header-feature title="Detalhar usuário" />
	<v-card>
		<v-card-text>
			<v-container grid-list-md>
				<v-layout wrap>
					<v-form class="mr-4 ml-4 mb-5 mt-0" v-model="valid" ref="form" lazy-validation @submit.prevent="submit">
						<v-flex xs12 sm4>
							<v-select
								v-if="usuario.ativo"
								label="Perfil"
								:items="perfis"
								v-model="usuario.perfil"
								:rules="[v => !!v || 'Perfil é obrigatório.']"
								required								
								>
							</v-select>
						</v-flex>
						
						<v-text-field							
							label="Nome completo"
							v-model="usuario.nome"							
							readonly
							disabled
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
						<v-container grid-list-sm text-xs-center style="margin-top:15px;">
							<v-layout row wrap>
								<v-flex xs6>
									<v-btn  v-if="usuario.ativo" outline  color="primary" @click="voltar">Voltar</v-btn>
									<v-btn  v-if="!usuario.ativo"  color="primary" @click="voltar">Voltar</v-btn>
								</v-flex>
								<v-flex xs6>
									<v-btn
										v-if="usuario.ativo"
										type="submit"
										color="primary"
										:disabled="!valid">
										Alterar
									</v-btn>
								</v-flex>
							</v-layout>
						</v-container>
						
					</v-form>
				</v-layout>
			</v-container>
		</v-card-text>
	</v-card>
</div>
</template>

<script>
	import localforage from 'localforage'
	import { mapState, mapActions } from 'vuex'
	import http from '@/service/http'
	import { bus } from '@/plugins/event-bus'
	import headerFeature from '@/components/header-feature'
		
	export default {
		name: 'detalheUsuario',				
		computed: {			
			...mapState('detalheusuario', ['usuarioSelecionado']),
			perfil () {
				if (this.token && this.token !== '') {
					const { perfil } = this.parseJWT(this.token)
					return perfil
				}
			}
		},
		async mounted () {
			this.$bus.$on('atualizar-user', obj => {
				if (obj && obj.token && obj.token !== '') {
					this.token = obj.token					
				}
			})
			this.token = await localforage.getItem('token')
			if (this.token && this.token !== '') {
				bus.$emit('atualizar-user', { token: this.token })
			}			
			http.get('/auth/users/buscar?id=' + this.$route.params.id)
				.then(this.sucessHandler)
				.catch(this.errorHandler)
		},
		methods: {
			...mapActions({				
				'setUsuarioSelecionado': 'detalheusuario/setUsuarioSelecionado'				
			}),
			parseJWT (token) {
				const base64Url = token.split('.')[1]
				const base64 = base64Url.replace('-', '+').replace('_', '/')
				return JSON.parse(window.atob(base64))
			},
			sucessHandler (res) {
				if (res.status === 200) {
					this.setUsuarioSelecionado(res.data)
					const { id, nome, cpf, email, perfil, ativo } = this.usuarioSelecionado

					this.usuario.nome = nome
					this.usuario.cpf = cpf
					this.usuario.email = email
					this.usuario.id = id
					this.usuario.perfil = perfil
					this.usuario.ativo = ativo
				}
			},
			voltar () {
				this.$router.go(-1)
			},			
			async submit () {
				const { id, nome, cpf, email, perfil } = this.usuario
				const response = await http.put('/auth/users/atualizar', {id, nome, cpf, email, perfil})
				if (response.status === 200) {
					bus.$emit('display-alert', {
						type: 'success',
						message: 'Usuário atualizado com sucesso'
					})
					this.setUsuarioSelecionado(response.data)				
				} else {
					bus.$emit('display-alert', {
						type: 'error',
						message: 'Verifique os dados passados'
					})
				}
			}
			
		},
		data: () => ({
			usuario: {
				nome: '',
				cpf: '',
				email: '',
				perfil: '',
				token: '',
				ativo: ''
			},						
			perfis: ['ADMINISTRADOR', 'COORDENADOR', 'COLABORADOR', 'ASSISTIDO'],
			valid: true,			
			nomeRules: [
				(v) => !!v || 'Nome é obrigatório',
				(v) => (v && v.length >= 10) || 'Pelo menos 10 caracteres.'
			]			
		}),
		components: {
			headerFeature
		}
	}
</script>
