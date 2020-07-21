<template>
    <div>
        <van-nav-bar title="我的订单" left-arrow @click-left="goBack"></van-nav-bar>
        <!-- 商品卡片 -->
        <div class="jbn_item" v-for="(item,index) in goodsList" :key="index">
            <p>查看订单</p>
            <van-card
            v-for="(value,i) in item" :key=" i"
                :num="value.number"
                :price="value.amount"
                :title="value.goodsName"
                :thumb="value.pic"
            />
        </div>
    </div>
</template>

<script>
import storage from "@/utils/storage"
export default {
    data() {
        return {
            goodsList:[]
        };
    },
    created() {

    },
    mounted() {
        this.getOrderList()
    },
    methods: {
        // 返回上一个页面
        goBack(){
            this.$router.go(-1)
        },
        // 获取订单
        getOrderList(){
            let user=JSON.parse(storage.get("09A_user",true))
            console.log(user)
            let formData=new FormData()
            formData.append("token",user.token)
            this.$axios.post("https://api.it120.cc/small4/order/list",formData).then(res=>{
                console.log(res)
                this.goodsList=res.data.goodsMap

            })
        }
    }
};
</script>

<style scoped>

</style>
