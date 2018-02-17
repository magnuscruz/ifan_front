<template>
	<v-content>
      <v-container fluid >
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed >
      <v-icon>add</v-icon>
    </v-btn>
</template>