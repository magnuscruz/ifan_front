const index = () => import('./')

export default [{
	path: '/usuarios/inativos',
	name: 'sol_acess.index',
	meta: {perfis: ['ADMINISTRADOR']},
	component: index
}]
