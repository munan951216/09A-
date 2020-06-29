//字面量的方式定义本地存储
const storage={
    // 设置本地存储
    // isJson是否需要对数据进行转换
    set:function(key,value,isJson=false){
        // 设置的方法啊，先做判断，判断key值跟value是否为空
        if(key.length==0 || value.length==0){
            return false
        }
        // 判断是否需要转换，为true进行转换，为false不转换
        let data=(isJson==true? JSON.stringify(value):value)
        // 设置缓存值
        localStorage.setItem(key,data)
    },
    // 获取本地存储
    get:function(key,isJson=false){
        // 判断参数是否合法
        if(key.length==0){
            return false
        }
        // 从本地存储获取内容
        let data=localStorage.getItem(key)
        return isJson==true?JSON.parse(data):data
    },  
    // 删除本地存储
    remove:function(key){
        if(key.length==0){
            return false
        }
        // 删除本地存储
        localStorage.removeItem(key)
    }
}
// 抛出对象
export default storage