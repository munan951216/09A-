<template>
  <div class="box">
    <!-- 图片懒加载 -->
    <div v-for="(item,index) in goodList" :key="index" class="item">
        <!-- <img src="@/assets/logo.png" :data-src="item.pic" alt /> -->
        <img :src="item.pic" alt="">
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodList: []
    };
  },
  created() {},
  mounted() {
      this.getTui()
    //   window.addEventListener("scroll",this.layzload)
     
  },
  methods: {
    getTui() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        this.goodList = res.data;
        this.$nextTick(
            // this.layzload
            this.waterfall
        )
      });
    },
    // 图片懒加载
    // layzload(){
    //     let html=document.documentElement||document.body
    //     let imgs=document.querySelectorAll("img")
    //     console.log(imgs)
    //     for(var i=0;i<imgs.length;i++){
    //         if(html.scrollTop+html.clientHeight>imgs[i].offsetTop){
    //             // this.$toast.loading({
    //             //     message:"正在努力加载中"
    //             // })
    //             imgs[i].src=imgs[i].getAttribute("data-src")
    //         }
    //     }
    // }
    // 瀑布流
    waterfall(){
        // 1.获取所有的元素
        let items=document.querySelectorAll(".item")
        console.log(items)
        // 2.计算出屏幕的宽度
        let bodyWidth=document.documentElement.clientWidth
        // 3.计算出每个元素的宽度
        let itemWidth=items[0].clientWidth
        // 4.计算出每一行要显示的列数
        let count=parseInt(bodyWidth/itemWidth)
        // console.log(count)
        // 5.定义一个空数组，用了存储每一列的高度
        let countArr=[]
        // 6.每个元素之间的间距
        let space=10
        // 7.将元素进行循环
        for(var i=0;i<items.length;i++){
            // 第一行图片的操作
            if(i<count){
                items[i].style.top="0px" //第一行图片的top值
                items[i].style.left=(itemWidth+space)*i+"px"  //第一行图片的left值
                // 将每一行每一列的高度推到空数组中
                countArr.push(items[i].clientHeight)
            }else{
                let minIndex=0  //找出每一列最小值的下标
                let minHeight=countArr[0]  //找出每一列最小高度
                for(var m=0;m<countArr.length;m++){
                    if(countArr[m]<minHeight){
                        minHeight=countArr[m]
                        minIndex=m
                    }
                }
                items[i].style.left=items[minIndex].offsetLeft+"px"
                items[i].style.top=minHeight+space+"px"
                countArr[minIndex]=minHeight+items[i].clientHeight+space
            }
            
        }
    }
  }
};
</script>

<style lang="scss" scoped>
/* img {
  width: 100%;
  height: 4.2rem;
} */
.box{
    width:100%;
    position: relative;
    div{
        width:45%;
        position: absolute;
        img{
            width:100%;
        }
    }
}
</style>
