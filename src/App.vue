<template>
  <div id="app">
    <!-- loading加载组件 -->
    <Loading v-show="this.$store.state.loading"></Loading>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import Loading from "@/components/common/loading"
export default {
  name: 'App',
  components:{
    Loading
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
body{
  font-size:0.16rem;
}
</style>
