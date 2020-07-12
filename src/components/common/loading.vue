<template>
  <div>
    <van-overlay :show="$store.state.loading">
      <div class="wrapper" >
        <van-loading size="44px" color="#fff" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
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

<style lang="scss" scoped>
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color:#fff;
  }
</style>
