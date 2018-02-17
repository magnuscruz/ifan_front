import Vue from 'vue'
import Router from 'vue-router'
import localforage from 'localforage'

import auth from '@app/auth/routes'
import user from '@app/users/routes'
import dashboard from '@app/dashboard/routes'
import projetos from '@app/projetos/routes'
import solicitacoes from '@app/acessos/routes'
import novoacesso from '@app/novoacesso/routes'
import resetsenha from '@app/resetsenha/routes'
import detalheusuario from '@app/detalheusuario/routes'
import meusdados from '@app/meusdados/routes'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		...auth,
		...user,
		...dashboard,
		...projetos,
		...novoacesso,
		...resetsenha,
		...solicitacoes,
		...detalheusuario,
		...meusdados
	]
})

const checkAuth = async (to, from, next) => {
	const token = await localforage.getItem('token')

	if (to.name === 'novoacesso.index') {
		return
	}

	if (to.name === 'resetsenha.index') {
		return
	}

	if (to.name !== 'auth.index' && token === null) {
		next({ name: 'auth.index' })
	}
}

const checkPerfil = async (to, from, next) => {
	const token = await localforage.getItem('token')

	if (token) {
		const { perfil } = parseJWT(token)
		if (to.meta.perfis && !to.meta.perfis.includes(perfil)) {
			localforage.removeItem('token').then(() => {
				next({ name: 'auth.index', query: { expired: true } })
			})
		}
	}
}

const parseJWT = (token) => {
	const base64Url = token.split('.')[1]
	const base64 = base64Url.replace('-', '+').replace('_', '/')
	return JSON.parse(window.atob(base64))
}

router.beforeEach(async (to, from, next) => {
	checkPerfil(to, from, next)
	checkAuth(to, from, next)
	next()
})

export default router
