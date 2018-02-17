<template>
	<div>
		<header-feature title="Dashboard" subtitle="v 1.0"/>
		<v-container grid-list-md text-xs-center>
			<v-layout row wrap>
				<v-flex xs12 sm3>
					<card title="solicitações aprovadas" 
						value="15" color="bg-blue"
						subtitle="Último mês" 
						icon="people_outline"/>
				</v-flex>
				<v-flex xs12 sm3>
					<card title="qtda projetos" 
						value="12" color="bg-red"
						subtitle="Apenas ativos" 
						icon="business_center"/>
				</v-flex>
			</v-layout>
		</v-container>
		<div style="background-color: #fff">

		</div>
	</div>
</template>

<script>
import headerFeature from '@/components/header-feature'
import card from '@/components/card'
export default {
	name: 'Dashboard',
	components: {
		headerFeature,
		card
	}
}
</script>