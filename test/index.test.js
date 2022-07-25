import Vue from '../src/index'

/**
 * @jest-environment jsdom
 */
test('proxyData',()=>{
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
    expect(app.info.msg).toBe('hello')
})

test('modelToView',()=>{
    document.body.innerHTML=
    `<div id="app"><p id="text">{{info.msg}}</p></div>`
    const app=new Vue({
        el:'#app',
        data:{
            info:{
                msg:'hello'
            }
        }
    })
    app.info.msg='hello world'
    expect(document.getElementById("text").textContent).toBe("hello world")
})

test('viewToModel',()=>{
    document.body.innerHTML=
    `<div id="app"><input id="input" type="text" v-model="info.msg"></input></div>`
    const app=new Vue({
        el:'#app',
        data:{
            info:{
                msg:'hello'
            }
        }
    })
    document.getElementById("input").value="hello world"
    document.getElementById("input").dispatchEvent(new Event('input'))
    expect(app.info.msg).toBe("hello world")
})