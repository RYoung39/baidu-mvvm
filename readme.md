# 百度大作业：实现一个简单的MVVM框架
## 个人信息
姓名：杨瑞  
学校：南京大学  
专业：软件工程  
年级：大二  
QQ：1594643089  
## 项目介绍
本次作业选题为MVVM框架，以下将对该作业实现进行简单的介绍。  
1.example目录下的demo.html文件用于前端展示  
2.src目录下的五个js文件为具体实现  
(1)index.js中实现了MVVM框架的核心view-model。在该类的构造函数中会进行一系列的初始化工作，包括保存dom、数据，进行数据代理、数据劫持、模板编译。数据代理直接在该类中实现，让用户可以通过vm.xx访问属性。  
(2)observer.js完成数据劫持的工作。walk方法用于遍历属性，defineReactive方法用于实现数据劫持，用以把每个属性设置为响应式。  
(3)dep.js和watcher.js共同实现响应式数据(model to view)。页面上每一个用到数据的地方都需要注册一个watcher，watcher会负责在数据发生改变时计算出表达式的新值并展现到页面上。每一个数据都拥有一个Dep实例，用于存储依赖于这个数据的watcher。当数据发生改变时，就通过dep来通知所有的watcher，触发watcher进行更新。同时dep又依赖于数据劫持：当数据的get方法被触发时（数据被读取使用），就会向这个数据的Dep实例中添加触发get方法的watcher；当数据的set方法被触发时（数据被修改），就会通知dep数据发生了改变。  
(4)compiler.js实现模板编译，用于将html文件中非原生语法的部分按照语法规则进行编译，转换成表达式然后让watcher计算出真正要展现到页面上的数据。  
3.test目录下的文件用于进行测试  
index.test.js中进行了整体的测试，包括数据代理测试、viewToModel测试、modelToView测试。  
compiler.test.js中对模板编译的方法进行了更精细化的测试，包括核心的转换成表达式的方法的测试，以及编译文本节点和元素节点两种情况的测试，编译元素节点中又对实现的两个指令v-text和v-model分别进行了测试。  
同时测试数据均采用的是嵌套对象。  
测试结果如下
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------|---------|----------|---------|---------|-------------------
All files    |   98.92 |    86.48 |   97.14 |   98.91 |                   
 compiler.js |     100 |    82.75 |     100 |     100 | 25-44,55,108      
 dep.js      |     100 |      100 |     100 |     100 |                   
 index.js    |      90 |      100 |      80 |      90 | 30                
 observer.js |     100 |      100 |     100 |     100 |                   
 watcher.js  |     100 |      100 |     100 |     100 | 


Test Suites: 2 passed, 2 total  
Tests:       7 passed, 7 total
Snapshots:   0 total  
Time:        7.103 s  
Ran all test suites.