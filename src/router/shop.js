import Register from '@/views/login/register'
import Login from '@/views/login/login'
import Index from '@/views/home/index'
import Home from '@/views/home/home'
import Category from '@/views/home/category'
import Cart from '@/views/home/cart'
import Me from '@/views/home/me'
import Cutlist from '@/views/good/cutlist'
import Cate from "@/views/good/cate"
import Search from "@/views/good/search"
import Article from "@/views/good/article"
import Detial from "@/views/good/detial"
import Remonnd from "@/views/good/remonnd"
import GoodDetail from "@/views/good/goodDetial"
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
    // 进入分类页面
    {
        path: "/category/cate/:id",
        name: "Cate",
        component: Cate,
        meta: {
            title: "严选商城-分类列表"
        }
    },
    // 进入搜索页面
    {
        path: "/category/search",
        name: "Search",
        component: Search,
        meta: {
            title: "严选商城-搜索页面"
        }
    },
    //进入精选专栏页面
    {
        path: "/good/article",
        name: "Article",
        component: Article,
        meta: {
            title: "严选商城-精选专栏"
        }
    },
    {
        path: "/good/detial/:id",
        name: "Detial",
        component: Detial,
        meta: {
            title: "严选商城-专栏详情"
        }
    },
    // 进入商品列表页面
    {
        path: "/good/remonnd",
        name: "Remonnd",
        component: Remonnd,
        meta: {
            title: "严选商城-商品列表"
        }
    },
    //    进入商品详情页面
    {
        path:"/good/goodDetail/:id",
        name:"GoodDetail",
        component:GoodDetail,
        meta:{
            title:"严选商城-商品详情"
        }
    }
]
export default shop