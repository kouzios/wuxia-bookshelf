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

</style>
