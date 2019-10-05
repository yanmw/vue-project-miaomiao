<template>
  <dev id="main">
    <Header/>
    Cinema
    <TabBar/>
  </dev>
</template>

<script>
  import Header from '@/components/Header'
  import TabBar from '@/components/TabBar'

  export default {
    name: "Cinema",
    components: {
      Header,
      TabBar
    }
  }
</script>

<style scoped>

</style>
