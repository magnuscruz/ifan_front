<template>
<div>
	<header-feature title="Solicitações pendentes" />
	<v-list three-line subheader>
		<div v-if="possuiSolicitacoes">
			<v-list-tile avatar v-for="item in solicitacoes" :key="item.email" @click="checked(item)">
				<v-list-tile-avatar>
					<v-icon @click="detalharUsuario(item.id)" class="grey lighten-1 white--text">perm_identity</v-icon>
				</v-list-tile-avatar>
				<v-list-tile-content>
					<v-list-tile-title>{{ item.nome }}</v-list-tile-title>
					<v-list-tile-sub-title>{{ item.email }}  {{ format(item.createdDate) }}</v-list-tile-sub-title>
				</v-list-tile-content>
				<v-list-tile-action>
					<v-btn icon ripple>
						<v-checkbox
							:value="item"
							v-model="selecionados"
						></v-checkbox>
					</v-btn>
				</v-list-tile-action>
			</v-list-tile>
		</div>
		<div class="no-solicitacoes" v-else>
			<h3>Nenhuma solicitação pendente.</h3>
		</div>
	</v-list>
	<v-card height="60px" style="overflow: hidden;" v-if="possuiSolicitacoes">
		<div class="aviso">
			<v-card-text transition="fade-transition" class="text-xs-center" v-show="!temSelecionado">
				Selecione uma solicitação para realizar operações.
			</v-card-text>
		</div>
      	<v-bottom-nav absolute :value="temSelecionado" color="transparent">
			<v-btn class="btn--active" flat color="primary" @click.prevent="askRemove">
				<span>Remover</span>
				<v-icon>delete</v-icon>
			</v-btn>
			<v-btn class="btn--active" flat color="primary" @click.prevent="askDetalhar(selecionados[0].id)" :disabled="selecionados.length>1">
				<span>Detalhar</span>
				<v-icon>mode_edit</v-icon>
			</v-btn>
			<v-btn class="btn--active" flat color="primary" @click.prevent="askAprovacao">
				<span>Aprovar</span>
				<v-icon>done</v-icon>
			</v-btn>
      	</v-bottom-nav>
    </v-card>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerFeature from '@/components/header-feature'
export default {
	name: 'solicitacoesAcesso',
	data: () => ({
		e3: 2
	}),
	async mounted () {
		this.fetch()
	},
	destroyed () {
		this.limparSolicitacoes()
	},
	computed: {
		...mapState('solicitacoes', ['solicitacoes', 'selecionados']),
		possuiSolicitacoes () {
			return this.solicitacoes.length > 0
		},
		temSelecionado () {
			return this.selecionados.length > 0
		}
	},
	methods: {
		...mapActions('solicitacoes', ['fetch', 'checked', 'aprovarLote', 'remove', 'detalhar', 'limparSolicitacoes']),
		askRemove () {
			if (this.selecionados.length > 0) {
				const msg = this.selecionados.length === 1 
					? 'Confirma remoção do item selecionado?' 
					: 'Confirma remoção dos itens selecionados?'
				const confirm = window.confirm(msg)
				
				if (confirm) {
					this.doRemove()
				}
			}
		},
		async doRemove () {
			this.remove().then((message) => {
				this.$bus.$emit('display-alert', {
					type: 'success',
					message
				})
				this.fetch()
			})
		},
		askAprovacao () {
			if (this.selecionados.length > 0) {
				const msg = this.selecionados.length === 1 
					? 'Confirma aprovação do item selecionado?' 
					: 'Confirma aprovação dos itens selecionados?'
				const confirm = window.confirm(msg)

				if (confirm) {
					this.doAprovacao()
				}
			}
		},
		async doAprovacao () {
			this.aprovarLote().then((message) => {
				this.$bus.$emit('display-alert', {
					type: 'success',
					message
				})
				this.fetch()
			})
		},
		askDetalhar (id) {
			this.detalhar()
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
		},		
		detalharUsuario (id) {			
			this.$router.push({name: 'detalheUsuario.index',
				params: {id}
			})
		}
	},
	components: {
		headerFeature
	}

}
</script>

<style scoped>
	.no-solicitacoes {
		padding: 20px;
	}
	.aviso {
		color: #378FB0;
	}
	.btn:hover {
		background-color: #378FB0;
		filter: grayscale(100%);
	}
</style>
