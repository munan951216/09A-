<template>
      <div id="jbn_banner">
      <!-- 轮播图片开始 -->
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img :src="item.picUrl" alt />
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播图片结束 -->
      <!-- 按钮部分开始 -->
      <nav>
        <ul>
          <li>
            <van-icon name="like" size="30" color="red" />
            <p>签到</p>
          </li>
          <li>
            <van-icon name="bag" size="30" color="red" />
            <p>礼券</p>
          </li>
          <router-link tag="li" to="/cutlist">
             <van-icon name="coupon" size="30" color="red" />
            <p>砍价</p>
          </router-link>
          <router-link tag="li" to="/good/article">
              <van-icon name="gift-card" size="30" color="red" />
            <p>专栏</p>
          </router-link>
         
        </ul>
      </nav>
      <!-- 按钮部分结束 -->
    </div>
</template>

<script>
export default {
    props:["bannerList"],
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
  #jbn_banner {
    width: 100%;
    position: relative;
    margin-bottom: 0.4rem;
    img {
      width: 100%;
    }
    nav {
      width: 100%;
      height: 2rem;
      position: absolute;
      bottom: 0rem;
      background: #fff;
      border-radius: 0.2rem 0.2rem 0rem 0rem;
      // border-bottom:0.04rem solid #ccc;
      ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          text-align: center;
          p {
            font-size: 0.4rem;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
