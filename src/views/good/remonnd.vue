<template>
    <div>
        <van-nav-bar title="商品列表" left-arrow @click-left="goBack" />
        <Tui :tuiList="tuiList"></Tui>
    </div>
</template>

<script>
import Tui from "@/components/home/tui"
export default {
    data() {
        return {
            tuiList:[]
        };  
    },
    created() {

    },
    mounted() {
        this.getTui()
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        // 获取商品列表数据
        getTui() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        // console.log(res.data);
        // this.tuiList = res.data;
          this.tuiList=res.data;
      });
    }
    },
    components:{
        Tui
    }
};
</script>

<style scoped>

</style>
