<template>
  <div class="jbn_box">
    <!-- 轮播图组件 -->
    <Banner :bannerList="bannerList"></Banner>
    <!-- 全民砍价部分开始 -->
    <div id="jbn_cut">
      <nav>全民砍价 
        <router-link to="/cutlist">></router-link>
      </nav>
      <!-- 砍价列表组件 -->
      <Cut :cutList="cutList"></Cut>
    </div>
    <!-- 全民砍价部分结束 -->
    <!-- 精选主题部分开始 -->
    <div id="jbn_good">
      <nav>精选专题 ></nav>
      <!-- 精选专题组件 -->
      <Article :goodList="goodList"></Article>
    </div>
    <!-- 精选主题部分结束 -->
    <!-- 人气推荐部分开始 -->
    <div id="jbn_tui">
      <router-link tag="nav" to="/good/remonnd">
        人气推荐
      </router-link>
      <!-- 人气推荐组件 -->
      <Tui :tuiList="tuiList"></Tui>
    </div>
    <!-- 人气推荐部分结束 -->
  </div>
</template>

<script>
import Banner from "@/components/home/banner"
import Cut from "@/components/home/cut"
import Article from "@/components/home/article"
import Tui from "@/components/home/tui"
export default {
  data() {
    return {
      bannerList: [],
      cutList: [],
      goodList: [],
      tuiList: []
    };
  },
  created() {},
  mounted() {
    // 调用获取轮播图方法
    this.getBanner();
    // 调用获取砍价商品方法
    this.getcutList();
    // 调用获取精选专题方法
    this.getGood();
    // 调用人气接口数据方法
    this.getTui();
  },
  components:{
    Banner,
    Cut,
    Article,
    Tui
  },
  methods: {
    // 获取轮播图
    getBanner() {
      this.$axios({
        url: "https://api.it120.cc/small4/banner/list"
      }).then(res => {
        // console.log(res);
        if (res.code == 0) {
          this.bannerList = res.data;
        }
      });
    },
    // 获取全民砍价部分数据
    getcutList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        // console.log(res.data);
        if (res.code == 0) {
          let arr = Object.keys(res.data.goodsMap).splice(-3);
          let tmp = [];
          arr.forEach(item => {
            tmp.push(res.data.goodsMap[item]);
          });
          this.cutList = tmp;
        // this.cutList=res.data.goodsMap
        }
      });
    },
    // 获取精选专题部分数据
    getGood() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        // console.log(res.data);
        if (res.code == 0) {
          this.goodList = res.data;
        }
      });
    },
    // 获取人气推荐部分数据
    getTui() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        // console.log(res.data);
        // this.tuiList = res.data;
         let arr = Object.keys(res.data).splice(-10);
          let tmp = [];
          arr.forEach(item => {
            tmp.push(res.data[item]);
          });
          this.tuiList = tmp;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.jbn_box {
  width: 100%;
  background: #f4f4f4;

}
#jbn_cut {
  width: 100%;
  margin-bottom: 0.4rem;
  nav {
    width: 100%;
    height: 0.88rem;
    background: #fff;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.4rem;
    // border-bottom: 0.01rem solid #ccc;
  }
}

#jbn_good {
  width: 100%;
  background: #fff;
  margin-bottom: 0.4rem;
  nav {
    width: 100%;
    height: 0.88rem;
    background: #fff;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.4rem;
    // border-bottom: 0.01rem solid #ccc;
  }
 
}
#jbn_tui {
  width: 100%;
  nav {
    width: 100%;
    height: 0.88rem;
    background: #fff;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.4rem;
    // border-bottom: 0.01rem solid #ccc;
  }
 
}
</style>
