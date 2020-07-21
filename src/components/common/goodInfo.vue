<template>
  <div>
    <!-- 商品详情 -->
    <div class="jbn_top">
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img :src="item.pic" alt class="jbn_swipe" />
        </van-swipe-item>
      </van-swipe>
      <p v-html="shopInfo.name"></p>
      <ul>
        <li>低价￥{{shopInfo.minPrice}}</li>
        <li>原价￥{{shopInfo.originalPrice}}</li>
        <li>库存{{shopInfo.stores}}</li>
      </ul>
    </div>
    <!-- 选项卡操作 -->
    <div class="jbn_tab">
      <van-tabs>
        <van-tab title="商品详情">
          <p v-html="content"></p>
        </van-tab>
        <van-tab title="商品评价">商品评价</van-tab>
      </van-tabs>
    </div>
  
    <!-- 返回按钮 -->
    <div class="jbn_back" @click="goBack">
      <van-icon name="arrow-left"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bannerList", "content","shopInfo"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    //   返回上一个页面
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" >
.jbn_top {
  width: 100%;
  margin-bottom: 0.4rem;
  background: #fff;
  p {
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  ul {
    width: 100%;
    display: flex;
    padding: 0rem 0.2rem;
    box-sizing: border-box;
    justify-content: space-between;
    color: #ccc;
    li:nth-child(1) {
      color: red;
    }
  }
}
.jbn_swipe {
  width: 100%;
}
.jbn_tab {
  width: 100%;
  p {
    padding: 0.2rem;
    box-sizing: border-box;
    width: 100% !important;
  }
  img {
    width: 100% !important;
  }
}
.jbn_back {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  width: 1rem;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  background: #fff;
  border-radius: 50%;
}
</style>
