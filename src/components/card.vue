<template>
  <div :class="color" class="cardDash">
      <div class="infoDash">
        <div class="topDash">
            {{ title }}
        </div>
        <div class="contentDash">
            {{ value }}
        </div>
        <div class="footerDash">
            {{ subtitle }}
        </div>
      </div>
      <div class="icoDash">
          <v-icon style="position: relative;top: 20%;" x-large dark>{{ icon }}</v-icon>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'value', 'subtitle', 'icon', 'color']
}
</script>


<style scoped>
    .bg-blue {
        background-color: #1ca8dd;
        border-bottom: #1ca8dd 1px solid;
    }
    .bg-red {
        background-color: #f13c6e;
        border-bottom: #f13c6e 1px solid;
    }
    .bg-purple {
        background-color: #615ca8;
        border-bottom: #615ca8 1px solid;
    }
    .bg-green {
        background-color: #33b86c;
        border-bottom: #33b86c 1px solid;
    }
    .bg-yellow {
        background-color: #f39c12;
        border-bottom: #f39c12 1px solid;
    }
    .cardDash {
        display: flex;
        color: #ffffff;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        cursor: pointer;
        border-radius: 2px;
    }
    .cardDash:hover {
        box-shadow: 0px 10px 10px rgba(1, 87, 155, 0.25), 0px 4px 2px rgba(1, 87, 155, 0.1);
        transition: all 500ms cubic-bezier(0.250, 0.460, 0.450, 0.940)
    }
    .infoDash {
        width: 100%;
    }
    .icoDash {
        padding: 10px;
        background: rgba(255,255,255,0.2);
        width: 50%;
    }
    .topDash {
        padding: 5px 5px 0px 5px;
        text-align: left;
        height: 32px;
        text-transform: uppercase;
        font-size: 9px;
    }
    .contentDash {
        font-size: 34px;
        font-weight: bold;
    }
    .footerDash {
        font-size: 10px;
    }
</style>
