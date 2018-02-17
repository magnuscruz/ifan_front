<template>
    <div class="header-margin">
        <div style="display: -webkit-box;">
            <h1>{{title}}</h1>
            <h6 v-if="subtitle !== null"> {{ subtitle }}</h6>
        </div>
        <v-divider />
    </div>
</template>

<script>
export default {
    props: ['title', 'subtitle']
}
</script>

<style scoped>
    .header-margin {
        margin-bottom: 20px;
        color: #797979;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
</style>


