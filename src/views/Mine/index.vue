<template>
    <dev id="main">
      <Header title="我的"/>
      <div id="content">
        <Login />
      </div>
      <TabBar/>
    </dev>
</template>

<script>
  import Header from '@/components/Header'
  import TabBar from '@/components/TabBar'
  import Login from '@/components/Login'
    export default {
        name: "Mine",
      components: {
        Header,
        TabBar,
        Login
      }
    }
</script>

<style scoped>

</style>
