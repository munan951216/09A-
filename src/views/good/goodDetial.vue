<template>
  <div class="jbn_box">
    <div class="jbn_top">
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img :src="item.pic" alt class="jbn_swipe" />
        </van-swipe-item>
      </van-swipe>
      <p v-html="shopInfo.name"></p>
      <ul>
        <li>低价￥{{shopInfo.minPrice}}</li>
        <li>原价￥{{shopInfo.originalPrice}}</li>
        <li>库存{{shopInfo.stores}}</li>
      </ul>
    </div>
    <!-- 选项卡操作 -->
    <div class="jbn_tab">
      <van-tabs>
        <van-tab title="商品详情">
          <p v-html="content"></p>
        </van-tab>
        <van-tab title="商品评价">商品评价</van-tab>
      </van-tabs>
    </div>
    <!-- 商品sku信息 -->
    <van-sku
      v-model="skuShow"
      :sku="sku"
      :goods="goods"
      @add-cart="cart"
      :custom-stepper-config="customStepperConfig"
    />
    <!-- 底部加入购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="this.$store.state.nums" @click="gotoCart"/>
      <van-goods-action-icon icon="shop-o" text="店铺" badge="1" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="addCart" />
    </van-goods-action>

    <!-- 返回按钮 -->
    <div class="jbn_back" @click="goBack">
      <van-icon name="arrow-left"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gId: 0, //商品id
      bannerList: [], //轮播图
      shopInfo: {}, //商品信息
      content: null, //商品详情
      goodsInfo: [], //商品的基本信息
      // sku的商品数据
      skuShow: false,
      sku: {
        // sku的规格类目,比如商品颜色，尺寸
        tree: [
          {
            k: "颜色",
            k_s: "c1",
            v: [
              { id: 1, name: "白色" },
              { id: 2, name: "红色" },
              { id: 3, name: "蓝色" }
            ]
          }
        ],
        // sku的组合列表
        list: [
          { id: 1000, c1: 1, price: 2000, stock_num: 12 },
          { id: 1000, c1: 2, price: 3000, stock_num: 12 },
          { id: 1000, c1: 3, price: 4000, stock_num: 12 }
        ],
        price: 100, //商品价格
        stock_num: 120 //商品库存
      },
      goods: {
        picture: ""
      },
      // 自定义步进器
      customStepperConfig: {
        // 步进器变化的回调
        handleStepperChange: currentValue => {
          console.log(currentValue);
          // 把点击步进器的值，给nums，用来记录数量
          this.nums = currentValue;
        }
      },
      nums: 1
    };
  },
  created() {},
  mounted() {
    this.gId = this.$route.params.id;
    this.getDetail();
    // 计算商品的总数量
    this.$store.commit("countCarts");
  },
  methods: {
    //   返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
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
        // 设置sku的信息

        this.setSku(res.data.properties);
        this.goods.picture = this.bannerList[0].pic;
      });
    },
    // 加入购物车
    addCart() {
      this.skuShow = true;
    },
    setSku(property) {
      // 定义属性不存在
      if (property == undefined) {
        return false;
      }
      let tree = []; //商品sku的规格信息
      let list = []; //商品sku组合列表信息
      // 遍历属性
      property.forEach(element => {
        let object = new Object();

        // 格式化sku的信息
        object.k = element.name;
        object.k_s = `c_${element.id}`;
        object.v = element.childsCurGoods;
        tree.push(object); //处理对象的方式
      });
      // console.log(tree)
      // 组装sku组合的数据，push到List中
      tree.forEach(item => {
        item.v.forEach(ele => {
          // console.log(ele)
          let obj = new Object();
          obj.id = item.k_s.split("_")[1]; //截取数组，提取id的对应信息
          obj[item.k_s] = ele.id;
          obj.price = 1000;
          obj.stock_num = 120;
          list.push(obj);
        });
      });
      this.sku.tree = tree;
      this.sku.list = list;
    },
    // 加入购物车
    cart() {
      // this.$router.push("/cart")
      console.log("test");
      let data = localStorage.getItem("09A_user");
      // 用户未登陆，跳转到登陆页面
      if (data == null) {
        this.$toast.fail("还没有登陆");
        this.$router.push("/shop/login");
        return false;
      }
      // 用户已登陆,添加购物车信息
      let cartList = this.$store.state.cartList; //购物车列表数据
      let index = cartList.findIndex(item => {
        // 判断当前商品的id是否重复
        return item.goods_id == this.gId;
      });
      console.log(index);
      // return false;
      if (index == -1) {
        // 添加购物车对象信息
        let object = new Object();
        object.goods_id = this.gId;
        object.name = this.goodsInfo.name;
        object.price = this.goodsInfo.originalPrice;
        object.nums = this.nums;
        object.properties = "";
        object.pic = this.goods.picture;
        object.checked = true;
        // 先判断
        cartList.push(object);
      }else{
        cartList[index].nums+=this.nums  //数量的自增
      }

      this.skuShow = false; //控制底部弹框的隐藏
      this.$toast.success("添加购物车成功");
      this.$store.commit("addCar", cartList);
      this.$store.commit("countCarts");
    },
    // 进入购物车页面
    gotoCart(){
      this.$router.push("/cart")
    }
  }
};
</script>
<style lang="scss" >
.jbn_box {
  background: #f4f4f4;
}
.jbn_top {
  width: 100%;
  margin-bottom: 0.4rem;
  background: #fff;
  p {
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  ul {
    width: 100%;
    display: flex;
    padding: 0rem 0.2rem;
    box-sizing: border-box;
    justify-content: space-between;
    color: #ccc;
    li:nth-child(1) {
      color: red;
    }
  }
}
.jbn_swipe {
  width: 100%;
}
.jbn_tab {
  width: 100%;
  p {
    padding: 0.2rem;
    box-sizing: border-box;
    width: 100% !important;
  }
  img {
    width: 100% !important;
  }
}
.jbn_back {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  width: 1rem;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  background: #fff;
  border-radius: 50%;
}
</style>
