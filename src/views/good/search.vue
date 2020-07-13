<template>
  <div>
    <van-search placeholder="请输入商品名称" v-model="keywords" @keydown.enter="setHistory">
        <template #left>
            <van-icon name="arrow-left" size="20" @click="goBack"></van-icon>
        </template>
    </van-search>
    <div class="jbn_history" v-show="hFlag">
        <div class="jbn_hisHead">
            <p>历史记录</p>
            <van-icon name="delete" @click="removeHistory"></van-icon>
        </div>
        <div class="jbn_item">
            <p v-for="(item,index) in historyList" :key="index">
                {{ item}}
            </p>
          
        </div>
    </div>
    <Tui :tuiList="getGood" v-show="!hFlag"></Tui>
  </div>
</template>

<script>
import Tui from "@/components/home/tui"
// 导入本地存储
import storage from "@/utils/storage"
export default {
  data() {
    return {
        searchList:[],
        keywords:"",//搜索关键字
        historyList:[],//历史记录
        hFlag:true //判断历史记录的效果是否显示
    };
  },
  created() {},
  components:{
      Tui,
  },
  mounted() {
      this.getSearch()
      this.getHistory()
    //   this.setHistory()
  },
  methods: {
      getSearch(){
          this.$axios({
              url:"https://api.it120.cc/small4/shop/goods/list"
          }).then(res=>{
              console.log(res)
              this.searchList=res.data
              console.log(this.searchList)
          })
      },
    //   获取历史记录
    getHistory(){
        let data=storage.get("yx_history",true)
        this.historyList=(data==null?[]:data)
    },
    // 设置历史记录
    setHistory(){
        // 判断keywords不能为空
        if(this.keywords==""){
            return false
        }
        this.historyList.unshift(this.keywords) //往历史记录中添加内容
        if(this.historyList.length>8){
            this.historyList.pop()
        }
        storage.set("yx_history",this.historyList,true)
        this.keywords=""
    },
    // 删除历史记录
    removeHistory(){
        storage.remove("yx_history")
        this.getHistory()
    },
    // 返回上一个页面
    goBack(){
        this.$router.go(-1)
    }
  },
  computed:{
      getGood(){
          if(this.keywords==""){
              this.hFlag=true
              return []
          }
          this.hFlag=false
          return this.searchList.filter(item=>{
              return item.name.indexOf(this.keywords)>-1
          })
      }
  }
};
</script>

<style lang="scss" scoped>
*{
    margin: 0;
}
.jbn_history{
    width:100%;
}
.jbn_hisHead{
    width:100%;
    padding:0.1rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items:center;
    p{
        font-size:0.36rem;
        font-weight: bold;
    }
}
.jbn_item{
    width: 100%;
    display:flex;
    padding:0.2rem;
    flex-wrap: wrap;
    // justify-content: space-around;
    box-sizing: border-box;
    p{
        width:23%;
        padding:0.2rem;
        box-sizing: border-box;
        background: #ccc;
        border-radius: 0.1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: 1%;
    }
}
</style>
