/*
*1.先引入axios
*2.axios.create方法创建实例
*3.使用实例对象，创建请求拦截器
*4.使用实例创建响应拦截器
*5.export  抛出实例对象
*6.main.js中引入request文件对象
*/ 
// 1.引入axios
import axios from "axios";
// 2.create方法创建一个实例
const Server =axios.create({
    baseURL:"",
    timeout:3000
})
// 3.使用实例对象，创建请求拦截器
Server.interceptors.request.use(function(config){
    return config
},function(error){
    return Promise.reject(error)
})
// 4.使用实例对象，创建响应拦截器
Server.interceptors.response.use(function(response){
    // 判断接口返回来的数据
    if(response.status==200){
        return response.data
    }
    console.log(response)
    return response
},function(error){
    return Promise.reject(error)
})
// 5.export抛出实例对象
export default Server