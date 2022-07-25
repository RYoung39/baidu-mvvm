import Vue from '../src/index'
import Compiler from "../src/compiler"

/**
 * @jest-environment jsdom
 */
 test('parseTextContent',()=>{
    document.body.innerHTML=
    `<div id="app"><p>111{{info.msg+'---'}}222</p></div>`
    const app=new Vue({
        el:'#app',
        data:{
            info:{
                msg:'hello'
            }
        }
    })
    const compiler=new Compiler(app);
    expect(compiler.parseTextContent("111{{info.msg+'---'}}222")).toBe("`111`+(info.msg+'---')+`222`")
    
})

test('compileElementText',()=>{
    document.body.innerHTML=
    `<div id="app"><p id="text">111{{info.msg+'---'}}222</p></div>`
    const app=new Vue({
        el:'#app',
        data:{
            info:{
                msg:'hello'
            }
        }
    })
    const compiler=new Compiler(app);
    let textNode=document.getElementById("text").firstChild
    expect(textNode.textContent).toBe("111hello---222")
})

test('compileElementNode_v-text',()=>{
    document.body.innerHTML=
    `<div id="app"><p id="text" v-text="info.msg"></p></div>`
    const app=new Vue({
        el:'#app',
        data:{
            info:{
                msg:'hello'
            }
        }
    })
    const compiler=new Compiler(app);
    let textNode=document.getElementById("text")
    expect(textNode.textContent).toBe("hello")
})

test('compileElementNode_v-model',()=>{
    document.body.innerHTML=
    `<div id="app"><input id="input" type="text" v-model="info.msg"></div>`
    const app=new Vue({
        el:'#app',
        data:{
            info:{
                msg:'hello'
            }
        }
    })
    const compiler=new Compiler(app);
    let textNode=document.getElementById("input")
    expect(textNode.value).toBe("hello")
})