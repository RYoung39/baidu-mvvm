import Dep from "./dep";

export default class Observer{
    constructor(data){
        this.data=data
        this.walk(data)
    }

    /**
     * 遍历data中的每一个属性
     * @param {*} data 
     * @returns 
     */

    walk(data){
        if(!data || typeof(data)!=='object') return;
        Object.keys(data).forEach((key)=>{
            this.defineReactive(data,key,data[key])
        })
    }

    /**
     * 把每个属性设置为响应式
     * @param {*} obj 
     * @param {*} key 
     * @param {*} value 
     */

    defineReactive(obj,key,value){
        
        //对于每一个数据，都要有一个dep，记录所有用到这个数据的地方（watcher）
        let dep=new Dep()
        Object.defineProperty(obj,key,{
            //可遍历
            enumerable:true,
            //不可再配置
            configurable:false,
            get:()=>{
                //在获取数据时添加watcher
                Dep.target && dep.add(Dep.target)
                return value
            },
            set:(newVal)=>{
                value=newVal
                console.log("set")
                //数据发生变更时调用dep的notify方法来通知所有的watcher
                dep.notify()
            }
        })

        //value本身可能还是对象（对象的嵌套）
        this.walk(value)
    }
}