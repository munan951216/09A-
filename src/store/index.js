import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
// 定义一个对象
const store=new Vuex.Store({
    // 数据
    state:{
        loading:false // loading加载显示标示符
    },
    // 同步方法
    mutations:{
        // 改变loading加载标示符
        setLoading(state,payLoad){
            state.loading=payLoad
        }
    },
    // 异步方法
    actions:{

    },
    // 计算属性
    getters:{

    },
    // 模块化
    modules:{

    }
})
// 导出对象
export default store