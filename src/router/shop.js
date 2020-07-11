import Register from '@/views/login/register'
import Login from '@/views/login/login'
import Index from '@/views/home/index'
import Home from '@/views/home/home'
import Category from '@/views/home/category'
import Cart from '@/views/home/cart'
import Me from '@/views/home/me'
import Cutlist from '@/views/good/cutlist'
const shop = [
    // 注册页面路由
    {
        path: "/shop/register",
        name: "shop_regiser",
        component: Register,
        meta: {
            title: "严选商城-注册页面"
        }
    },
    // 登录页面路由
    {
        path: "/shop/login",
        name: "shop_login",
        component: Login,
        meta: {
            title: "严选商城-登录页面"
        }
    },
    // {
    //     path: "/",
    //     name: "home_index",
    //     component: Index,
    //     meta: {
    //         title: "严选商城-登录页面"
    //     }
    // },
    // 底部tarbar切换路由
    {
        path: "/home",
        name: "Home",
        component: Home,
        // redirect:"/",
        children: [
            //首页页面路由
            {
                path: "/index",
                name: "home_index",
                component: Index,
                meta: {
                    title: "首页"
                }
            },
            {
                path: "/category",
                name: "Category",
                component: Category,
                meta: {
                    title: "严选商城-分类页面"
                }
            },
            {
                path: "/cart",
                name: "Cart",
                component: Cart,
                meta: {
                    title: "严选商城-购物车页面"
                }
            },
            {
                path: "/me",
                name: "Me",
                component: Me,
                meta: {
                    title: "严选商城-个人中心"
                }
            },

        ]
    },
    // 进入砍价列表
    {
        path: "/cutlist",
        name: "Cutlist",
        component: Cutlist,
        meta: {
            title: "严选商城-砍价页面"
        }
    },
]
export default shop