<template>
  <div>
    <div class="jbn_swipe">
      <van-swipe :loop="false" :width="300" :show-indicators="false">
        <van-swipe-item v-for="(item,index) in goodList" :key="index" class="jbn_item">
          <img :src="item.pic" alt />
          <p>{{ item.title}}</p>
          <p>{{ item.descript}}</p>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  props: ["goodList"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.jbn_swipe {
  width: 100%;
  img {
    height: 6rem;
    border-radius: 0.05rem;
  }
  p {
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 0.2rem;
  }
  p:nth-child(3) {
    color: #ccc;
  }
}
</style>
