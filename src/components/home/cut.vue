<template>
    <div>
        <div class="jbn_cutlist" v-for="(item,index) in cutList" :key="index">
        <div class="jbn_cutLeft">
          <img :src="item.pic" alt />
        </div>
        <div class="jbn_cutRight">
          <p v-html="item.name"></p>
          <p v-html="item.characteristic"></p>
          <ul>
            <li>
              <p class="jbn_price">￥{{item.minPrice}}</p>
              <p class="jbn_minPrice">低价</p>
            </li>
            <li>
              <p>￥{{item.originalPrice}}</p>
              <p>原价</p>
            </li>
            <li>
              <p>{{item.stores}}件</p>
              <p>限量</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props:["cutList"],
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.jbn_cutlist {
  width: 100%;
  background: #fff;
  border-bottom: 0.01rem solid #f4f4f4;
  display: flex;
  padding: 0.2rem;
  box-sizing: border-box;
  .jbn_cutLeft {
    width: 30%;
    padding: 0.03rem;
    box-sizing: border-box;
    img {
      width: 100%;
    }
  }
  .jbn_cutRight {
    width: 70%;
    padding: 0rem 0.2rem;
    box-sizing: border-box;
    font-size: 0.3rem;
    p:nth-child(2) {
      color: #ccc;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    ul {
      width: 100%;
      display: flex;
      color: #ccc;
      li {
        margin-right: 0.5rem;
        width: 8rem;
        .jbn_price {
          color: red;
        }
        .jbn_minPrice {
          color: #000;
        }
      }
    }
  }
}
</style>
