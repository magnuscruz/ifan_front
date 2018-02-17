<template>
	<v-app id="inspire">
		<navigation />
		<the-toolbar />
		<container />
	</v-app>
</template>

<script>
	import navigation from './navigation'
	import TheToolbar from './the-toolbar'
	import container from './container'
	export default {
		data: () => ({
					drawer: null
				}),
		components: {
			navigation,
			TheToolbar,
			container
		}
	}
</script>