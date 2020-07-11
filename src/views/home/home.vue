<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/me">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>
