<template>
  <div>
    <van-nav-bar title="严选专栏" left-arrow @click-left="goBack" />
    <router-link tag="div" class="jbn_item" v-for="(item,index) in goodList" :key="index" :to="'/good/detial/'+item.id">
        <img :src="item.pic" alt />
      <p v-html="item.title"></p>
      <p v-html="item.descript"></p>
      <p>
        <van-button round class="jbn_btn">查看详情</van-button>
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodList: []
    };
  },
  created() {},
  mounted() {
    // 调用获取精选专题方法
    this.getGood();
  },
  methods: {
    // 返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取精选专栏数据
    getGood() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        console.log(res.data);
        if (res.code == 0) {
          this.goodList = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.jbn_item {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  position: relative;
  img {
    width: 100%;
    height: 5rem;
  }
  p {
    width: 90%;
    line-height: 0.66rem;
    position: absolute;
    left: 5%;
    text-align: center;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p:nth-of-type(1) {
    top: 0.4rem;
  }
  p:nth-of-type(2) {
    top: 1.2rem;
  }
  p:nth-of-type(3) {
    top: 2rem;
  }
}
.jbn_btn {
  background: none;
  color: #fff;
}
</style>
