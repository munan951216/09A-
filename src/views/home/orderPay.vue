<template>
  <div>
    <van-nav-bar title="确认付款" left-arrow @click-left="goBack"></van-nav-bar>
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
    <!-- 订单列表 -->
      <div class="jbn_address">
      <div>
        <van-icon name="gold-coin-o"></van-icon>
      </div>
      <div>
        <p>订单编号：
            {{this.$store.state.orderInfo.orderNumber}}
        </p>
        <p>订单金额：￥
            {{this.$store.state.orderInfo.amount}}
        </p>
      </div>
      <div>
        <!-- <van-icon name="arrow"></van-icon> -->
      </div>
    </div>
    <div class="jbn_bottom">
        <van-button type="danger" block @click="doPay">立即支付</van-button>
    </div>
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  data() {
    return {
        addressList:[]
    };
  },
  created() {},
  mounted() {
      this.getAddress()
  },
  methods: {
      goBack(){
          this.$router.go(-1)
      },
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
        console.log(res)
        if (res.code != 0) {
          this.$toast.fail("请先登录");
          this.$router.push("/shop/login");
          return false;
        }
        this.addressList = res.data;
      });
    },
    // 点击支付
    doPay(){
        this.$toast.success("支付成功")
        this.$store.commit("clear")
        this.$router.push("/index")
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
.jbn_bottom{
    position: absolute;
    bottom:0rem;
    width:100%;
}
</style>
