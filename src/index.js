import Observer from "./observer"
import Compiler from "./compiler"

export default class Vue{
    constructor(options){
        //保存dom
        this.$el=document.querySelector(options.el)
        //保存数据
        this.$data=options.data
        //可以通过vm.xx直接访问属性(数据代理)
        this.proxyData(this.$data)
        //数据劫持
        new Observer(this.$data)
        //模板编译
        new Compiler(this)

    }

    /**
     * 可以通过vm.xx直接访问属性(数据代理)
     * @param {*} data 
     */
    proxyData(data){
        Object.keys(data).forEach((key)=>{
            Object.defineProperty(this,key,{
                get:()=>{
                    return data[key]
                },
                set:(newVal)=>{
                    data[key]=newVal
                }
            })
        })
    }
}
window.Vue=Vue