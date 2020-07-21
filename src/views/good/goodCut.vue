<template>
  <div>
    <GoodInfo :bannerList="bannerList" :content="content" :shopInfo="shopInfo"></GoodInfo>
    <van-button type="danger" block class="jbn_button" @click="goCut">立即砍价</van-button>
  </div>
</template>
<script>
import GoodInfo from "@/components/common/goodInfo";
export default {
  data() {
    return {
      gId: 0, //商品id
      kjid:0, //商品的砍价Id
      bannerList: [], //轮播图
      shopInfo: {}, //商品信息
      content: null, //商品详情
      goodsInfo: [] //商品的基本信息
    };
  },
  created() {},
  mounted() {
      this.gId=this.$route.params.id
      this.kjid = this.$route.params.kjid;
    //   console.log(this.gId)
      this.getDetail()
  },
  methods: {
      getDetail() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.gId
        }
      }).then(res => {
        // console.log(res);
        this.bannerList = res.data.pics;
        this.shopInfo = res.data.basicInfo;
        this.content = res.data.content;
        // 设置商品的基本信息
        this.goodsInfo = res.data.basicInfo;
      });
    },
    goCut(){
        this.$router.push({
          name:"CutInfo",
          params:{
            id:this.gId,
            kjid:this.kjid
          }
        })
    }
  },
  components: {
    GoodInfo
  }
};
</script>

<style scoped>
.jbn_button {
  position: fixed;
  bottom: 0rem;
}
</style>
