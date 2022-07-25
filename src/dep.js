export default class Dep{
    constructor(){
        this.subs=[]
    }

    /**
     * 添加watcher
     * @param {*} target 
     */
    add(target){
        this.subs.push(target)
    }

    /**
     * 当数据发生变化时通知watcher
     */
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}