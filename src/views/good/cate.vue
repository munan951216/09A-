<template>
  <div>
    <van-nav-bar title="分类商品" left-arrow @click-left="onClickLeft" />
    <Tui :tuiList="goodList" v-if="goodList.length>0"></Tui>
    <van-empty image="error" description="还没有商品" v-else/>
  </div>
</template>
<script>
import Tui from "@/components/home/tui"
export default {
  data() {
    return {
      cId: 0 ,//分类的Id
      tuiList:[]
    };
  },
  computed:{
      goodList(){
          return this.tuiList.filter(item=>{
              return item.categoryId==this.cId
          })
      }
  },
  components:{
    Tui,
  },
  created() {
      console.log(this.$route.params.id)
  },
  mounted() {
    this.cId = this.$route.params.id //接受分类的Id
    this.getGoodList()
  },
  methods: {
    getGoodList() {
        
        this.$axios({
            url:"https://api.it120.cc/small4/shop/goods/list"
        }).then(res=>{
            console.log(res)  
            this.tuiList=res.data
            console.log(this.tuiList)
        })
    },
    //  分类页面点击返回回到上一个页面
    onClickLeft() {
      this.$router.go(-1);
    },
  }
};
</script>

<style scoped>
</style>
