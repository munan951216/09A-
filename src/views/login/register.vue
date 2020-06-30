<template>
    <div class="jbn_box">
        <van-nav-bar title="用户注册" left-arrow  class="jbn_top"/>
        <!-- 页面布局 -->
        <div id="jbn_login">
            <van-form>
                <h3 class="jbn_head">新用户注册</h3>
                <van-field placeholder="手机号" class="jbn_inp" right-icon="graphic" v-model="mobeil"/>
                <van-field placeholder="密码" v-model="pwd" class="jbn_inp" :right-icon="hidePwd?'closed-eye':'eye-o'" :type="hidePwd?'password':'text'" @click-right-icon="hidePwd=!hidePwd"/>
                <van-field placeholder="确认密码" v-model="confirm_pwd" class="jbn_inp" :right-icon="hidePwd1?'closed-eye':'eye-o'" :type="hidePwd1?'password':'text'" @click-right-icon="hidePwd1=!hidePwd1"/>
                <van-field placeholder="用户名" v-model="nick" class="jbn_inp" right-icon="user-o"/>
                <van-field placeholder="图形验证码" v-model="picCode" class="jbn_inp" >
                    <template #right-icon>
                        <van-image :src="imgUrl" @click="createImgCode" class="jbn_img"/>
                    </template>
                </van-field>
                <van-field placeholder="城市" v-model="area" class="jbn_inp" right-icon="location-o" @click="areaShow=true"/>
                <!-- 城市信息弹出层 -->
                <van-popup v-model="areaShow" position="bottom" >
                   <van-area title="标题" :area-list="areaList"   @cancel="areaShow=false" @confirm="selectedArea"/>
                </van-popup>
                <van-field placeholder="手机验证码" class="jbn_inp" v-model="code">
                    <template #right-icon>
                        <van-button type=danger plain size="small" @click="sendCode" :disabled="btnIsAbled">
                            {{ msg}}
                        </van-button>
                    </template>
                </van-field>
                <van-button type="info" block class="jbn_btn" @click="checkForm">立即注册</van-button>
            </van-form>
        </div>
    </div>
</template>

<script>
// import  "@/assets/style/reset.css";
import AreaList from "@/utils/area.js"
export default {
    data() {
        return {
            // 控制密码显示隐藏  true 代表密码框，false代表文本框
            hidePwd:true,
            hidePwd1:true,
            mobeil:"",//手机号
            pwd:"",//密码
            confirm_pwd:"",//确认密码
            nick:"",//用户名
            picCode:"",//图形验证码
            code:"",//验证码
            imgUrl:"",//图形验证码路径
            picKey:"", //图形验证码的key值
            areaShow:false, //地址弹出层显示隐藏
            areaList:AreaList,
            area:"",//地址
            province:"",//省份
            city:"",//城市
            btnIsAbled:false,//button按钮禁用状态
            msg:"发送验证码"
            
        };
    },
    created() {

    },
    mounted() {
        // 调用自动生成图片验证码方法
        this.createImgCode()
    },
    methods: {
        // 表单校验
        checkForm(){
            // 验证表单基本信息不能为空
            if(this.mobeil==""|| this.pwd==""||this.nick==""||this.picCode==""||this.code==""){
                // 提示错误信息
                this.$toast.fail("手机号、密码、昵称、图形验证码、验证码不能为空")
                return false
            }
            
            // 手机号的正则表达式
            var reg=/^1[345678]\d{9}$/
            // 校验手机号是否合法
            if(!reg.test(this.mobeil)){
                this.$toast.fail("手机号不合法")
                return false
            }
            // 确认密码和密码是否一致
            if(this.confirm_pwd!=this.pwd){
                 this.$toast.fail("密码跟确认密码不一致")
                return false
            }
            //提交注册信息
            this.submitRegister()
           
        },
        // 生成图形验证码
        createImgCode(){

            this.picKey=new Date().getTime()
            console.log(this.picKey)
            let apiUrl="https://api.it120.cc/small4/verification/pic/get"
            this.imgUrl=`${apiUrl}?key=${this.picKey}`
        },
        // 选择城市
        selectedArea(arr){
            this.areaShow=false
            console.log(arr)
            let tmp=arr.map((item)=>{
                return item.name
            })
            console.log(tmp)
            // 处理省份城市
            this.province=tmp[0]
            this.city=tmp[1]
            this.area=tmp.join("/")
        },
        // 倒计时
        coundSeconds(){
            this.btnIsAbled=true
            // 倒计时的时间
            let timeOut=10
            // 设置定时器
            let time= setInterval(()=>{
                // 当倒计时时间小于1时，清空定时器
                if(timeOut<1){
                    this.btnIsAbled=false
                    clearInterval(time)
                    this.msg= `重新发送`
                    return false
                }
                timeOut--
                this.msg=`${timeOut}s后再试`
               
            },1000)            
        },
        // 发送验证码
        sendCode(){
            this.$axios({
                // 获取验证码地址
                url:"https://api.it120.cc/small4/verification/sms/get",
                // 参数
                params:{
                    mobile:this.mobeil,
                    key:this.picKey,
                    picCode:this.picCode
                }
            }).then(res=>{
                console.log(res)
                if(res.code!=0){
                    this.$toast.fail(res.msg);
                    return false;
                }
            })
            // 调用倒计时的方法
            this.coundSeconds()
        },
        // 提交注册
        submitRegister(){
            this.$axios({
                url:"https://api.it120.cc/small4/user/m/register",
                params:{
                    mobile:this.mobeil,
                    pwd:this.pwd,
                    code:this.code,
                    nick:this.nick,
                    province:this.province,
                    city:this.city
                }
            }).then(res=>{
                console.log(res)
                if(res.code!=0){
                    this.$toast.fail(res.msg)
                    return false
                }
                 // 验证完成，注册成功
                this.$toast.success("恭喜您，注册成功！")
            })
        }
    }
};
</script>

<style lang="scss" scoped>

#jbn_login{
    width:90%;
    border:0.01rem solid #ddd;
    margin:0.5rem auto;
    padding:0.2rem;
    box-sizing: border-box;
    border-radius:0.05rem;
    .jbn_head{
        font-size:0.4rem;
    }
    .jbn_inp{
        border:0.01rem solid #f4f4f4;
        border-radius: 0.05rem;
        margin-top:0.4rem;
        font-size: 0.4rem;
        height:1rem;
    }
    .jbn_btn{
      background-image: linear-gradient(90deg,#ffb821 0,#ff5c38 45%,#ff1459);
      border: none;
      box-shadow: 0px 3px 2px rgba($color: #000000, $alpha: .3);
      height:1rem;
      font-size:0.5rem;
      outline:none;
    }
}
.jbn_img{
    width: 3rem;
}
</style>
