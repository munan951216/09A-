<template>
  <div>
       <van-nav-bar title="砍价列表" left-arrow @click-left="onClickLeft" />
      <Cut :cutList="cutList"></Cut>
  </div>
</template>

<script>
import Cut from "@/components/good/cut"
export default {
  data() {
    return {
      cutList: []
    };
  },
  created() {},
  mounted() {
    this.getcutList();
  },
  components:{
      Cut
  },
  methods: {
    // 获取全民砍价部分数据
    getcutList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        // console.log(res.data);
        if (res.code == 0) {
          //   this.cutList = tmp;
          this.cutList = res.data.goodsMap;
        }
      });
    },
    onClickLeft() {
      this.$router.push("/index");
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
