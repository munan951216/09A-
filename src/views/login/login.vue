<template>
    <div>
        <van-nav-bar title="用户登录" left-arrow  class="jbn_top"/>
        <div id="jbn_login">
         
            <van-form>
                <h3 class="jbn_head">用户登录</h3>
                <van-field placeholder="手机号" class="jbn_inp" right-icon="graphic" v-model="mobeil"/>
                <van-field placeholder="密码" v-model="pwd" class="jbn_inp" :right-icon="hidePwd?'closed-eye':'eye-o'" :type="hidePwd?'password':'text'" @click-right-icon="hidePwd=!hidePwd"/>
              
                <van-button type="info" block class="jbn_btn" @click="checkLogin">立即登录</van-button>
            </van-form>
            <p class="jbn_login">
                <router-link to="/shop/register">还没账号？立即注册</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import "@/assets/style/login.css"
// 引入本地存储的方法
import storage from "@/utils/storage"
export default {
    data() {
        return {
            mobeil:"",
            pwd:"",
            hidePwd:true
        };
    },
    created() {

    },
    mounted() {

    },
    // 组件内的路由守卫，判断用户是否登录
    beforeRouteEnter(to,from,next){
        // 获取用户本地存储的token值，判断是否为null，如果已经登录，直接跳转到主页。如果没有登录，继续在当前页面。
        let data=storage.get("09A_user")
        // console.log(data)
        // next()
        if(data!=null){
            next("/")
        }else{
            next()
        }
    },
    methods: {
        checkLogin(){
            // 校验表单是否为空
              // 验证表单基本信息不能为空
            if(this.mobeil==""|| this.pwd==""){
                // 提示错误信息
                this.$toast.fail("手机号、密码不能为空")
                return false
            }
            
            // 手机号的正则表达式
            var reg=/^1[345678]\d{9}$/
            // 校验手机号是否合法
            if(!reg.test(this.mobeil)){
                this.$toast.fail("手机号不合法")
                return false
            }
            // 调用登录操作
            this.doLogin()
        },
        // 执行登录操作
        doLogin(){
            this.$axios({
                url:"https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey",
                params:{
                    mobile:this.mobeil,
                    pwd:this.pwd
                }
            }).then(res=>{
                console.log(res)
                if(res.code!=0){
                    this.$toast.fail(res.msg)
                    return false
                }
                // 把用户登录信息保存到本地存储
                let user=new Object()
                user.uid=res.data.uid
                user.token=res.data.token
                user.account=this.mobeil
                storage.set("09A_user",user,true)
                this.$toast.success("恭喜你，登录成功")
                
            })
        }
    }
};
</script>

<style scoped>

</style>
