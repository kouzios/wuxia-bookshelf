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

html {
  height: 100%;
}

body {
  min-height: 100%;
}

#app {
  background-color: #0b0c10;
  height: 100%;
}

.title {
  color: #c5c6c7;
}

.error {
  color: red;
}
</style>
