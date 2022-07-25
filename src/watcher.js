import Dep from "./dep"

export default class Watcher{
    constructor(exp,scope,cb){
        this.exp=exp
        this.scope=scope
        this.cb=cb
        this.update()
    }

    /**
     * 返回表达式的值
     * @param {*} exp 
     * @returns 
     */
    get(exp){
        //要计算表达式值的时候，一定会触发数据的get方法
        //先把watcher实例挂在dep.target上，get方法从dep.target处取，就实现了把watcher方法添加到dep中
        Dep.target=this
        let newVal=Watcher.cal(this.exp,this.scope)
        Dep.target=null
        return newVal
    }

    /**
     * 计算表达式的值，采用new function和with实现
     * @param {*} exp 
     * @param {*} scope 
     * @returns 
     */
    static cal(exp,scope){
        let fn=new Function("scope","with(scope){return "+exp+"}")
        return fn(scope)
    }

    /**
     * 
     * 执行回调函数，将新的值展现到页面上
     */
    update(){
        let newVal=this.get(this.exp)
        this.cb && this.cb(newVal)
    }
}