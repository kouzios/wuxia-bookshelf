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

/* Does not work in Navigation component for some reason */
.navigation_container .dropdown-menu {
  background-color: #6c757d !important;
}

.title {
  font-size: 12px;
  font-weight: bold;
  color: #c5c6c7;
}

.error {
  color: red;
}
</style>
