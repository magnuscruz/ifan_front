<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      app v-if='!showLogin'
      v-model="drawer" >
      <v-list dense>
        <template v-for="(item, i) in itemMenuComPermissao" >
          <v-list-tile :key="i" @click="navigate(item.router)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dark
      app v-if='!showLogin'
      clipped-left
      fixed >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 320px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">IFAN - Instituto da Infância</span>
        <span class="hidden-sm hidden-md hidden-lg hidden-xl">IFAN</span>
      </v-toolbar-title>
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon v-if="perfil === 'ADMINISTRADOR'" @click="navigate('sol_acess.index')">
          <v-badge left color="red" overlap :value="qtdaSolicitacoes > 0">
            <span slot="badge">{{ qtdaSolicitacoes }}</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
        
        <v-menu
          offset-x
          :close-on-content-click="false"
          :nudge-width="200"
          max-width="350"
          v-model="menu"
        >
          <v-btn icon large slot="activator">{{this.siglaNome(this.nomeLogado)}}</v-btn>
          <v-card>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  {{this.siglaNome(this.nomeLogado)}}
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ this.nomeLogado }}</v-list-tile-title>
                  <v-list-tile-sub-title>Edite o perfil</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile class="item">
                <v-list-tile-title @click="logout">
                  <v-icon>exit_to_app</v-icon>
                  Sair
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-toolbar>
    <v-content>
      <v-container fluid >
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer class="hidden-xs-only" app v-if='!showLogin'
      fixed :style="'color: #fff'" color="primary">
      <span>&copy; iSystem - 2018</span>
    </v-footer>
    <the-alerts />
  </v-app>
</template>

<script>
  import localforage from 'localforage'
  import { mapState, mapActions } from 'vuex'
  import TheAlerts from '@/components/alerts'
  import { bus } from '@/plugins/event-bus'
  export default {
    data: () => ({
      drawer: null,
      menu: false,
      count: 0,
      nomeLogado: '',
      token: '',
      items: [
        { icon: 'dashboard', text: 'Dashboard', router: 'dashboard.index' },
        { icon: 'input', text: 'Solicitações', router: 'sol_acess.index', perfis: [ 'ADMINISTRADOR' ] }, 
        { icon: 'group', text: 'Usuários', router: 'users.index', perfis: [ 'ADMINISTRADOR' ] },
        { icon: 'child_care', text: 'Assistidos' },
        { icon: 'business_center', text: 'Projetos', router: 'projetos.index', perfis: [ 'ADMINISTRADOR' ] },
        { icon: 'settings', text: 'Configurações' },
        { icon: 'keyboard', text: 'Meus Dados', router: 'meus_dados.index' }
      ],
      opcoes: []
    }),
    async mounted () {
      this.$bus.$on('config-user', obj => {
        if (obj && obj.token && obj.token !== '') {
          this.token = obj.token
          const {nome, perfil} = this.parseJWT(obj.token)
          this.nomeLogado = nome
          if (perfil === 'ADMINISTRADOR') {
            this.fetch()
          }
        }
      })
      this.token = await localforage.getItem('token')
      if (this.token && this.token !== '') {
        bus.$emit('config-user', { token: this.token })
      }
    },
    methods: {
      ...mapActions('solicitacoes', ['fetch']),
      navigate (rota) { this.$router.push({name: rota}) },
      executar (acao) { 
        if (acao === 'sair') {
          this.logout()
        }
      },
      logout () {
        localforage.removeItem('token').then(() => {
          this.$router.push({ name: 'auth.index' })
          bus.$emit('display-alert', {
						type: 'info',
						message: 'Logout realizado com sucesso!'
					})
        })
      },
      parseJWT (token) {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(window.atob(base64))
      },  
      siglaNome (nome) {
        let partes = nome.split(' ')
        let sigla = partes[0].charAt(0).toUpperCase()
        if (partes.length > 1) {
            sigla += partes[partes.length - 1].charAt(0).toUpperCase()
        } else {
            sigla += partes[0].charAt(1).toUpperCase()
        }
        return sigla
      }
    },
    computed: {
      ...mapState('solicitacoes', ['solicitacoes']),
      showLogin () { 
        return (this.$route.name === 'auth.index' || this.$route.name === 'novoacesso.index' || this.$route.name === 'resetsenha.index') 
      },
      perfil () {
        if (this.token && this.token !== '') {
          const { perfil } = this.parseJWT(this.token)
          return perfil
        }
      },
      qtdaSolicitacoes () {
        return this.solicitacoes.length
      },
      itemMenuComPermissao () {
        if (this.token && this.token !== '') {
          const { perfil } = this.parseJWT(this.token)
          return this.items.filter((item) => {          
            if (item.perfis) {
              return item.perfis.includes(perfil)
            } else {
              return true
            }
          })
        }
      } 
    },
    components: {
      TheAlerts
    }
  }
</script>

<style scoped>
  .item:hover {
    background: rgba(0,0,0,.12);
  }
</style>