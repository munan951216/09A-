<template>
  <div>
    <van-nav-bar title="我的地址" left-arrow @click-left="goBack" right-text="新建地址"></van-nav-bar>
    <!-- 地址列表 -->
    <div class="jbn_item" v-for="(item,index) in addressList" :key="index">
      <div class="left">
        <p>
          {{item.linkMan}}-{{item.mobile}}
        </p>
        <p>
            {{ item.address}}
        </p>
      </div>
      <div class="right" @click="delete(item,id)">
        <van-icon name="delete"></van-icon>
      </div>
    </div>
  </div>
</template>
<script>
import storage from "@/utils/storage";
export default {
  data() {
    return {
      addressList: []
    };
  },
  created() {},
  mounted() {
    this.getAddress();
  },
  methods: {
    // 返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取地址
    getAddress() {
      let data = JSON.parse(storage.get("09A_user", true));
      console.log(data);
      let formData = new FormData();
      formData.append("token", data.token);
      this.$axios
        .post(
          "https://api.it120.cc/small4/user/shipping-address/list",
          formData
        )
        .then(res => {
          console.log(res);
            this.addressList=res.data
        });
    },
    // 删除地址
    delete(id){
        let user=JSON.parse(storage.get("09A_user", true));
        let formData=new FormData
        formData.append('token',user.token)
        formData.append("id",id)
      
    }
  }
};
</script>

<style  lang="scss" scoped>
.jbn_item{
    width:100%;
    display:flex;
    padding: 0.2rem;
    box-sizing: border-box;
    align-items:center;
    justify-content: space-between;
    border-bottom: 0.01rem solid #ccc;
    .left{
        width:80%;
    }
}
</style>
