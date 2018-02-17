<template>
	<v-app id="inspire">
		<header-feature title="Pesquisar usuários" />
		<div style="background-color: #fff">
			<v-form v-model="valid" ref="form" lazy-validation>
				<v-container grid-list-md text-xs-center>
					<v-layout row wrap>
						<v-flex xs12 sm4>
							<v-text-field
								label="Nome"
								v-model="name"
								:rules="[v => v.length >= 4 || 'Pelo menos 4 caracteres.']"
								append-icon="search"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm4>
							<v-select
								label="Perfil"
								v-model="perfil"
								:items="perfis"
								:rules="[v => !!v || 'Perfil é obrigatório.']"
								required
								>
							</v-select>
						</v-flex>
						<v-flex xs12 sm4>
							<v-select
								label="Situação"
								v-model="situacao"
								:items="situacoes"
								:rules="[v => !!v || 'Situação é obrigatório.']"
								required
								>
							</v-select>
						</v-flex>
					</v-layout>
				</v-container>
			</v-form>
			<v-list three-line subheader>
				<div v-if="possuiUsuarios">
					<v-list-tile avatar v-for="item in searchByName" :key="item.email" @click="detalharUsuario(item.id)">
						<v-list-tile-avatar>
							<v-icon @click="detalharUsuario(item.id)" class="grey lighten-1 white--text">perm_identity</v-icon>
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>{{ item.nome }}</v-list-tile-title>
							<v-list-tile-sub-title>{{ item.email }}  {{ format(item.createdDate) }}</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
				</div>
				<div class="no-solicitacoes" v-else>
					<h3>Nenhum usuário encontrado pro critério de busca.</h3>
				</div>
			</v-list>
		</div>
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerFeature from '@/components/header-feature'
export default {
	data: function () {
		return {
			valid: false,
			name: '',
			perfil: 'Todos',
			perfis: ['Todos', 'Administrador', 'Coordenador', 'Colaborador', 'Assistido'],
			situacao: 'Ativos',
			situacoes: ['Todos', 'Ativos', 'Inativos']
		}
	},
	computed: {
		...mapState('users', ['usuarios']),
		possuiUsuarios () {
			return this.usuarios.length > 0
		},
		searchByName () {
			return this.usuarios.filter(usuario => {
				return usuario.nome.toLowerCase().includes(this.name.toLowerCase()) || usuario.email.toLowerCase().includes(this.name.toLowerCase())
			})
		}
	},
	methods: {
		...mapActions('users', ['fetch']),
		detalharUsuario (id) {			
			this.$router.push({name: 'detalheUsuario.index',
				params: {id}
			})
		},
		format (dataLong) {
			var data = new Date(dataLong)
			var dia = data.getDate()
			if (dia.toString().length === 1) {
				dia = '0' + dia
			}
			var mes = data.getMonth() + 1
			if (mes.toString().length === 1) {
				mes = '0' + mes
			}
			var ano = data.getFullYear()
			return dia + '/' + mes + '/' + ano
		}
	},
	watch: {
		name: function (value) {
			if (value.length > 3) {
				this.fetch({nome: value, ativo: this.situacao, perfil: this.perfil})
			}
		},
		perfil: function (value) {
			this.fetch({ ativo: this.situacao, perfil: value })
		},
		situacao: function (value) {
			this.fetch({ ativo: value, perfil: this.perfil })
		}
	},
	components: {
		headerFeature
	}
}
</script>
