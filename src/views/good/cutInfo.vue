<template>
  <div class="jbn_box">
    <div class="jbn_top">
      <p>
        <van-icon name="user-circle-o" size="40" color="#fff"></van-icon>
      </p>
      <p>我发现一件好货，来帮我砍到最低价吧</p>
      <div class="jbn_detail">
        <img :src="goods.pic" alt />
        <div class="right">
          <p v-html="goods.name"></p>
          <p>
            <span>
              低价：￥
              {{goods.minPrice}}
            </span>
            <span>
              原价：￥
              {{goods.originalPrice}}
            </span>
          </p>
        </div>
      </div>
      <p class="jbn_kj">
        当前砍价：{{ goods.originalPrice-kj.curPrice}},已砍：
        {{kj.curPrice}}
        元
      </p>
      <div class="jbn_list">
        <p>以当前价格购买</p>
        <p>邀请好友砍价</p>
      </div>
      <p class="jbn_time">{{ getTime }}</p>
    </div>
    <div class="jbn_back" @click="goBack">
      <van-icon name="arrow-left"></van-icon>
    </div>
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  data() {
    return {
      id: 0,
      kjid: 0,
      goods: [],
      kj: {},
      time: "",
      hm:""
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.params.id;
    this.kjid = this.$route.params.kjid;
    this.doCut();
    this.getDetail();
    // this.getTime();
  },
  computed:{
       getTime() {
      setTimeout(() => {
        let date = new Date();
        let time = new Date(2020 - 7 - 19);
        // console.log(date,time)
        // let diff = time - date;
        this.hm=date-time
      }, 1000);
        //  console.log(diff)
        // 天
        let day = parseInt(this.hm / 1000 / 60 / 60 / 24);
        // 小时
        let hour = parseInt(this.hm / 1000 / 60 / 60) % 24;
        // 分
        let minutes = parseInt(this.hm / 1000 / 60) % 60;
        // 秒
        let seconds = parseInt(this.hm / 1000) % 60;
        let time1=`${day}:${hour}:${minutes}:${seconds}`
        return time1
    }
  },
  methods: {
    // 返回到上一个页面
    goBack() {
      this.$router.go(-1);
    },
    doCut() {
      let formData = new FormData();
      let user = JSON.parse(storage.get("09A_user", true));
      formData.append("token", user.token);
      formData.append("kjid", this.kjid);
      this.$axios
        .post("https://api.it120.cc/small4/shop/goods/kanjia/join", formData)
        .then(res => {
          this.kj = res.data;
          console.log(this.kj);
        });
    },
    // 获取商品详情
    getDetail() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.id
        }
      }).then(res => {
        console.log(res.data.basicInfo);
        this.goods = res.data.basicInfo;
      });
    },
    // 倒计时
   
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.jbn_box {
  width: 100%;
  .jbn_top {
    width: 100%;
    height: 13rem;
    background: linear-gradient(to right top, #e7d9bf, #b7a47c);
    text-align: center;
    > p:nth-child(1) {
      padding-top: 1.2rem;
      //   margin-top:2rem;
    }
    > p:nth-child(2) {
      color: #fff;
    }
  }
  .jbn_back {
    width: 1rem;
    height: 1rem;
    background: #fff;
    position: fixed;
    top: 1rem;
    left: 1rem;
    border-radius: 50%;
    text-align: center;
    line-height: 1rem;
  }
}
.jbn_detail {
  width: 90%;
  display: flex;
  height: 3rem;
  background: #f6edde;
  margin: 0rem auto;
  border-radius: 0.5rem;
  img {
    width: 30%;
    border-radius: 0.5rem;
  }
  .right {
    text-align: left;
    p:nth-child(2) {
      display: flex;
      justify-content: space-between;
      span:nth-child(1) {
        color: #b09972;
      }
      span:nth-child(2) {
        text-decoration: line-through;
        color: #8e8f90;
      }
    }
    p {
      line-height: 1.2rem;
    }
  }
}
.jbn_list {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  p {
    height: 1.6rem;
    // border: 1px solid #000;
    padding: 0.4rem;
    box-sizing: border-box;
    color: #fff;
  }
  p:nth-of-type(1) {
    background: #b0a48c;
  }
  p:nth-of-type(2) {
    border: 1px solid #b0a48c;
  }
}
</style>
