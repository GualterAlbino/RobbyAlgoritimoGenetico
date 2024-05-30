<template>
  <v-app>
    <v-main>
      <GraficoRobby />
    </v-main>
  </v-app>
</template>

<script>
import GraficoRobby from './components/GraficoRobby.vue'

export default {
  name: 'App',

  components: {
    GraficoRobby
  },

  data: () => ({
    //
  })
}
</script>
