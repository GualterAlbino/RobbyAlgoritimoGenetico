<template>
  <div class="container">
    <span>{{ tempoFormatado }}</span>
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      
    }
  },
  computed: {
   
  },
  methods: {
   
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.buttons {
  margin-top: 20px;
}
button {
  margin: 0 5px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
