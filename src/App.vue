<template>
  <div id="app">
    <navigation/>
    <router-view/>
  </div>
</template>

<script>
import navigation from '@/components/Navigation'

export default {
  components: {
    navigation
  }
}
</script>

<style>
.selectable {
  cursor: pointer;
}

body, html {
  font-family: 'Verdana, Arial';
}

#app {
  background-image: url('/static/background.jpg');
  background-attachment: fixed;
  height: 100%;
}

.title {
  color: #0080FF;
}
</style>
