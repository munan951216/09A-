<template>
    <div>
        <van-search placeholder="请输入搜索内容"  @focus="goSearch"></van-search>
        <div>
            <van-tree-select :items="topList" :main-active-index.sync="activeIndex" @click-nav="changeLeft">
                <template #content>
                    <div class="jbn_subcate">
                        <router-link tag="div" :to="'/category/cate/'+item.id"  v-for="(item,index) in subCate" :key="index" class="jbn_item">
                            <img :src="item.icon" alt="">
                            <p>{{item.name}}</p>
                        </router-link>
                    </div>
                </template>
            </van-tree-select>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            topList:[{text:"所有分类"}],//顶级分类
            activeIndex:0, //导航栏索引
            cateIds:[0],//顶级分类ID
            categoryList:[],//所有的分类数据
        };
    },
    created() {

    },
    computed:{
        // 计算属性
        subCate(){
            let arr=this.categoryList
            // 当前选择的是所有分类的话
            if(this.activeIndex==0){
                return arr
            }
            // 筛选子集分类
            return arr.filter(item=>{
                return item.pid==this.cateIds[this.activeIndex]
            })
        }
    },
    mounted() {
        // 获取分类数据
        this.getCategory()
    },
    methods: {
        // 获取分类页面数据
        getCategory(){
            this.$axios({
                url:"https://api.it120.cc/small4/shop/goods/category/all"
            }).then(res=>{
                console.log(res.data)
                this.categoryList=res.data
                // forEach循环，获取顶级分类
                res.data.forEach(item => {
                    if(item.pid==0){
                        this.topList.push({text:item.name})
                        this.cateIds.push(item.id)
                    }
                });
                // console.log(this.cateIds)
            })
        },
        // 点击切换左侧菜单
        changeLeft(index){
            console.log(this.cateIds[index])
        },
        // 跳转到search页面
        goSearch(){
            this.$router.push({
                path:"/category/search"
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.jbn_subcate{
    max-height:90%;
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    .jbn_item{
        width:28%;
        margin:1%;
    }
    img{
        width:90%;
    }
    p{
        width:90%;
        text-align:center;
        line-height:0.36rem;
    }
}
</style>
