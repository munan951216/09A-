<template>
  <div>
    <van-nav-bar title="专栏详情" left-arrow @click-left="goBack"/>
    <div class="jbn_article">
        <p v-html="article.title">
        </p>
        <p>
            <img :src="article.pic" alt="">
        </p>
        <p v-html="article.content"></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        aId:0,
        article:{}
    };
  },
  created() {},
  mounted() {
      console.log(this.$route.params.id)
      this.aId=this.$route.params.id
      this.getInfo()
  },
  methods: {
    // 返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取详情页面数据
    getInfo(){
        this.$axios({
            url:"https://api.it120.cc/small4/cms/news/detail",
            methods:"post",
            params:{
                id:this.aId
            }
        }).then(res=>{
            console.log(res)
            this.article=res.data
        })
    }

  }
};
</script>

<style lang="scss" scoped>
.jbn_article{
    width:100%;
    padding:0.2rem;
    box-sizing: border-box;
    img{
        width:100%;
        height:5rem;
    }
    p:nth-of-type(1){
        text-align:center;
        width:100%;
    }
    p:nth-of-type(3){
        text-indent: 1rem;
    }
}
</style>
