<template>
    <div>
        <div class="jbn_tuilist">
        <div v-for="(item,index) in tuiList" :key="index">
          <img :src="item.pic" alt />
          <p>{{ item.name}}</p>
          <p>{{ item.characteristic}}</p>
          <p>￥{{item.minPrice}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props:["tuiList"],
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
 .jbn_tuilist {
    width: 100%;
    padding: 0rem 0.2rem;
    box-sizing: border-box;
    display: flex;
    background: #fff;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      width: 48%;
      img {
        height: 6rem;
        width: 100%;
      }
      p:nth-child(2) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p:nth-child(3) {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #ccc;
      }
      p:nth-child(4) {
        color: red;
      }
    }
  }
</style>
