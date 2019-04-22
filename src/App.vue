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
  height: 100%;
}

#app {
  background: url('/static/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
}

.title {
  color: #0080FF;
}

.error {
  color: red;
}
</style>
