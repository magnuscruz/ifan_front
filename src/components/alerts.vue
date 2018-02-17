<template>
    <v-snackbar
      :timeout="timeout"
      :color="color"
      v-model="snackbar"
    >
        {{ text }}
        <v-btn dark flat @click.native="snackbar = false">Fechar</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    mounted () {
        this.$bus.$on('display-alert', obj => {
            const { type, message } = obj
            this.color = type
            this.text = message
            this.snackbar = true
        })
        this.$bus.$on('clear-alerts', () => {
            this.snackbar = false
            this.text = ''
        })
    },
    data: () => ({
        color: '',
        timeout: 6000,
        snackbar: false,
        text: '' 
    })
}
</script>

