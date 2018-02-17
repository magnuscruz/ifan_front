<template>
	<v-toolbar
      :style="'background-color: #378FB0 !important'"
      color="blue darken-3"
      dark
      app
      clipped-left
      fixed >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 320px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">IFAN - Instituto da Infância</span>
        <span class="hidden-sm hidden-md hidden-lg hidden-xl">IFAN</span>
      </v-toolbar-title>
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large>
          <v-list-tile-avatar size="32px">
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
        </v-btn>
      </div>
    </v-toolbar>
</template>