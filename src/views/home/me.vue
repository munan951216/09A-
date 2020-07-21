<template>
  <div class="jbn_box">
    <div id="user-top">
      <div>
        <van-uploader v-model="fileList" style="border-radius: 50%;">
          <van-icon name="add-o" size="80" v-show="fileList.length==0" />
        </van-uploader>
      </div>
      <div>
        <p>立即登录</p>
        <p>积分:0</p>
      </div>
    </div>
    <!-- <van-notice-bar left-icon="volume-o" text="新上线更稳定的付费快递查询" /> -->
    <van-notice-bar left-icon="volume-o" text="新上线更稳定的付费快递查询" />
    <!-- 订单列表 -->
    <div class="jbn_order" @click="gotoPage('/mine/order')">
      <p>
        <van-icon name="balance-list-o" color="gold" size="25"></van-icon>
        <span>我的订单</span>
        <van-icon name="arrow" size="25"></van-icon>
      </p>
      <van-grid>
        <van-grid-item icon="paid" text="待付款" />
        <van-grid-item icon="send-gift-o" text="待发货" />
        <van-grid-item icon="logistics" text="待收货" />
        <van-grid-item icon="comment-o" text="待评价" />
      </van-grid>
    </div>
    <!-- 订单列表结束 -->
    <van-grid :column-num="3">
      <van-grid-item text="我的余额">
        <template #icon>
          <van-icon name="gold-coin-o" color="red" size="30"></van-icon>
        </template>
      </van-grid-item>
      <van-grid-item text="我的砍价">
        <template #icon>
          <van-icon name="edit" color="red" size="30"></van-icon>
        </template>
      </van-grid-item>
      <van-grid-item text="我的礼券">
        <template #icon>
          <van-icon name="coupon-o" color="gold" size="30"></van-icon>
        </template>
      </van-grid-item>
      <van-grid-item text="我的收藏">
        <template #icon>
          <van-icon name="star-o" color="gold" size="30"></van-icon>
        </template>
      </van-grid-item>
      <van-grid-item text="我的地址" @click="gotoPage('/mine/address')">
        <template #icon>
          <van-icon name="location" color="skyblue" size="30"></van-icon>
        </template>
      </van-grid-item>
      <van-grid-item text="我的客服">
        <template #icon>
          <van-icon name="service-o" color="gold" size="30"></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [{ url: "/static/user.png" }]
    };
  },
  created() {},
  mounted() {},
  methods: {
    gotoPage(url){
      this.$router.push(url)
    }
  }
};
</script>

<style lang="scss" >
* {
  margin: 0;
}
.jbn_box {
  width: 100%;
  background: #ccc;
}
 #user-top {
    color: #fff;
    background: #c1b18f;
    padding: 0.3rem;
    box-sizing: border-box;
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div:nth-of-type(2) {
      width: 75%;
      p {
        line-height: 0.66rem;
        font-size: 0.35rem;
      }
      p:nth-of-type(2) {
        width: 2rem;
        text-indent: 0.1rem;
        font-size: 0.25rem;
        background: #b3a078;
      }
    }
    .van-uploader__preview-image img {
      border-radius: 50% !important;
    }
  }
.jbn_order {
  width: 100%;
  background: #ccc;
  margin-bottom: 0.2rem;
  p {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    display: flex;
    height: 1.2rem;
    align-items: center;
    justify-content: space-between;
    background: #f4f4f4;
    font-size: 0.4rem;
    border-bottom: 0.01rem solid #ccc;
    span {
      width: 80%;
      text-indent: 0.3rem;
      // font-size:0.36rem;
    }
  }
}
</style>
