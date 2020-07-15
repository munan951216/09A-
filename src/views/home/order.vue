<template>
  <div class="jbn_box">
    <van-nav-bar title="确认订单" left-arrow @click-left="goBack"></van-nav-bar>
    <!-- 地址栏 -->
    <div class="jbn_address">
      <div>
        <van-icon name="location-o"></van-icon>
      </div>
      <div>
        <p>{{addressList.linkMan}}-{{addressList.mobile}}</p>
        <p>{{addressList.address}}</p>
      </div>
      <div>
        <van-icon name="arrow"></van-icon>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="jbn_list">
      <p>商品列表</p>
      <van-card
        v-for="(item,index) in this.$store.state.orderList"
        :key="index"
        :num="item.nums"
        :price="item.price"
        :title="item.name"
        :thumb="item.pic"
      ></van-card>
    </div>
    <!-- 备注栏 -->
    <div class="jbn_remark">
        <van-field placeholder="如需留言请输入" label="备注"></van-field>
    </div>
    <div class="jbn_amount">
        <p>商品金额</p>
        <p>
            ￥{{ this.$store.getters.countAmount}}
        </p>
    </div>
    <!-- 提交订单栏 -->
    <van-submit-bar :price="this.$store.getters.countAmount*100" button-text="确认订单" @submit="createOrder"/>
  </div>
</template>

<script>
import storage from "@/utils/storage";
import qs from "qs"
export default {
  data() {
    return {
      addressList: []
    };
  },
  created() {},
  mounted() {
    // 获取默认地址
    this.getAddress();
   
  },
  methods: {
    // 返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取默认地址

    getAddress() {
      // 获取用户的基本信息
      let data = JSON.parse(storage.get("09A_user", true));
      if (data == null) {
        this.$toast.fail("请先登录");
        this.$router.push("/shop/login");
        return false;
      }
      console.log(data)
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/default",
        params: {
          token: data.token
        }
      }).then(res => {
        this.addressList = res.data;
      });
    },
    // 创建订单的信息
    createOrder(){
        let user=JSON.parse(storage.get("09A_user",true))
        // console.log(user)
        // console.log(data)
        // 组装一下商品信息
        let arr=[]
        this.$store.state.orderList.forEach(item => {
            let object=new Object()
            object.goodsId=item.goods_id
            object.number=item.nums
            object.propertyChildIds=item.properties
            object.logisticsType=0
            arr.push(object)
        });
        // console.log(arr)
        // 创建formData的数据
        let formData=new FormData()
        formData.append("token",user.token)
        formData.append("goodsJsonStr",JSON.stringify(arr))
        // console.log(formData)
       this.$axios.post("https://api.it120.cc/small4/order/create",formData).then(res=>{
           console.log(res)
           this.$toast.loading(
               {
                   message:"订单努力生成中",
                   overlay:true
               }
           )
           this.$store.commit("setOrder",res.data)
           console.log(this.$store.state.orderInfo)
           setTimeout(()=>{
               this.$router.push("/orderpay")
           },2000)
       })
    }
  }
};
</script>

<style lang="scss" scoped>
.jbn_address {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  border-bottom: 0.01rem solid #ccc;
  div:nth-of-type(2) {
    width: 80%;
    p {
      line-height: 0.6rem;
    }
  }
}
.jbn_list {
  margin-top: 0.5rem;
  width: 100%;
  // height:5rem;
  background: #f4f4f4;
  p {
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
    background: #ccc;
  }
}
.jbn_amount{
    width:100%;
    padding:0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: #f4f4f4;
    margin-top:0.2rem;
}
</style>
