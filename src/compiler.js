import Watcher from "./watcher"

export default class Compiler{
    constructor(vm){
        this.$el=vm.$el
        this.vm=vm
        console.log(this.$el)
        //将dom转换为documentFragment
        this.$fragment=this.nodeToFragment(this.$el)
        //编译模板
        this.compile(this.$fragment)
        //将documentFragment添加到页面中
        this.$el.appendChild(this.$fragment)

    }

    /**
     * 将dom转换为documentFragment
     * @param {*} node 
     * @returns 
     */

    nodeToFragment(node){
        let fragment=document.createDocumentFragment()
        if(node.childNodes && node.childNodes.length){
            node.childNodes.forEach(child => {
                if(!this.ignore(child)){
                    fragment.appendChild(child)
                }               
            });
        }
        return fragment

    }

    /**
     * 判断结点是否应该被忽略，应该被忽略返回true（注释、没有实际文本内容的文本结点）
     * @param {*} node 
     * @returns 
     */
    ignore(node){
        let reg=/^[\t\n\r]+/
        //注释结点的type为8，文本结点type为3
        return (node.nodeType===8 || (node.nodeType===3 && reg.test(node.textContent)))
    }

    compile(node){
        if(node.childNodes && node.childNodes.length){
            node.childNodes.forEach((child)=>{
                if(child.nodeType===1){
                    //元素节点
                    this.compileElementNode(child)
                    this.compile(child)
                }
                else if(child.nodeType===3){
                    //文本节点
                    this.compileElementText(child)
                }
            })
        }
    }

    /**
     * 编译元素节点
     * @param {*} node 
     */
    compileElementNode(node){
        let attrs=[...node.attributes]
        
        attrs.forEach(attr=>{
            let{name:attrName,value:attrValue}=attr
            if(attrName.indexOf("v-")>-1){
                let dirName=attrName.slice(2)
                switch (dirName){
                    case "text":
                        new Watcher(attrValue,this.vm,newVal=>{
                            node.textContent=newVal
                        })
                        break
                    case "model":
                        new Watcher(attrValue,this.vm,newVal=>{
                            node.value=newVal
                        })
                        node.addEventListener("input",e=>{
                            //使用数组的reduce方法来实现嵌套对象的赋值
                            let attrArr=attrValue.split(".")
                            attrArr.reduce((prev,next,currentIndex)=>{
                                if(currentIndex === attrArr.length-1){
                                    return prev[next]=e.target.value
                                }
                                return prev[next]
                            },this.vm.$data)
                        })
                        break
                }
                
            }
        })

    }

    /**
     * 编译文本节点
     * @param {*} node 
     */
    compileElementText(node){
        let content=node.textContent
        if(content){
            //要将content从字符串转换为表达式
            //当数据发生变化时，重新计算表达式的值并反馈给页面，即可实现数据变化后页面也变化
            let exp=this.parseTextContent(content)
            //对于每一个结点都要注册一个watcher，负责更新页面
            new Watcher(exp,this.vm,(newVal)=>{
                node.textContent=newVal
            })
        }
    }

    /**
     * 文本->表达式
     * @param {*} content 
     */
    parseTextContent(content){
        let reg=/\{\{(.+?)\}\}/g
        //分割
        let pieces=content.split(reg)
        //匹配
        let match=content.match(reg)

        let tokens=[]
        pieces.forEach((item)=>{
            //如果是插值语法包裹的内容，需要加()
            if(match && match.indexOf("{{"+item+"}}")>-1){
                tokens.push('('+item+')')
            }
            else {
                tokens.push('`'+item+'`')
            }
        })
        
        return tokens.join("+")

    }
}