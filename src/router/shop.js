import Register from '@/views/login/register'
import Login from '@/views/login/login'
const shop = [
    // 注册页面路由
    {
        path: "/shop/register",
        name: "shop_regiser",
        component: Register,
        meta:{
            title:"严选商城-注册页面"
        }
    },
    // 登录页面路由
    {
        path:"/shop/login",
        name:"shop_login",
        component:Login,
        meta:{
            title:"严选商城-登录页面"
        }
    }
]
export default shop