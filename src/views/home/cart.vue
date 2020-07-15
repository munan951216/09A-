<template>
  <div>
    <van-nav-bar title="购物车" left-arrow @click-left="goBack"></van-nav-bar>
    <!-- 购物车列表 -->
    <div class="jbn_item" v-for="(item,index) in cartList" :key="index">
      <van-checkbox v-model="item.checked"></van-checkbox>
      <van-card
        class="jbn_card"
        num="2"
        :price="item.price"
        desc="描述信息"
        :title="item.name"
        :thumb="item.pic"
      >
        <template #num>
          <van-stepper v-model="item.nums"></van-stepper>
        </template>
      </van-card>
    </div>
    <van-submit-bar :price="totalAmounts" button-text="提交订单" @submit="goOrder">
      <van-checkbox v-model='checked'>全选</van-checkbox>
    
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
      checked:true
    };
  },
  created() {},
  mounted() {
    this.cartList = this.$store.state.cartList;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 进入提交订单页面
    goOrder(){
      
      this.$toast.loading({
        duration:3000,
        message:"商品准备中",
        overlay:true
      })
      // 获取订单列表数据
      this.$store.commit("setOrderlist")
      setTimeout(()=>{
         this.$router.push("/order")
      },3000)
     
    }
  },
  computed:{
      totalAmounts(){
          let amounts=0
          this.cartList.forEach(item=>{
              if(item.checked==true){
                  amounts+=item.nums*item.price
              }
          })
          return amounts*100
      }
  },
  watch:{
      cartList:{
          handler(value){
            //   console.log(value)
            this.$store.commit("addCar",value)
            this.$store.commit("countCarts")
            let arr=value.filter(item=>{
                return item.checked==true
            })
            if(value.length==arr.length){
                this.checked=true
            }else{
                this.checked=false
            }
          },
          deep:true
      }
  }
};
</script>

<style lang="scss" scoped>
.jbn_item {
  // background: #ccc;
  padding: 0.2rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .jbn_card {
    flex: 1;
  }
}
</style>
