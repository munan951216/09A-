import Vue from "vue"
import Vuex from "vuex"
import VuexPersist from "vuex-persist" //导入持久化工具
Vue.use(Vuex)
const vuexLocal = new VuexPersist({
    storage: window.localStorage
})
// 定义一个对象
const store = new Vuex.Store({
    // 数据
    state: {
        loading: false, // loading加载显示标示符
        cartList: [], //购物车列表
        nums: 0, //总数量
        orderList:[], //订单列表
        orderInfo:[]
    },
    // 同步方法
    mutations: {
        // 改变loading加载标示符
        setLoading(state, payLoad) {
            state.loading = payLoad
        },
        // 添加购物车的操作
        addCar(state,payLoad){
            state.cartList=payLoad
        },
        // 
        countCarts(state){
            let tmp=0
            // 遍历购物车的数量
            state.cartList.forEach(item => {
                tmp+=item.nums
            });
            // 计算总数量
            state.nums=tmp
        },
        setOrderlist(state){
            state.orderList=state.cartList.filter(item=>{
                return item.checked==true
            })
        },
        setOrder(state,payLoad){
            state.orderInfo=payLoad
        },
        // 清空购物车
        clear(state){
            state.cartList=[]
            state.orderList=[]
        }
    },
    // 异步方法
    actions: {

    },
    // 计算属性
    getters: {
        // 计算订单总价
        countAmount(state){
            let amount=0
            state.orderList.forEach(item=>{
                amount+=item.nums*item.price
            })
            return amount
        }
    },
    // 模块化
    modules: {

    },
    plugins: [vuexLocal.plugin]
})
// 导出对象
export default store