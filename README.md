# chanblog

<img src="https://github.com/chanQvQ/chanblog/assets/145744078/80488746-be8f-4c94-b7de-a6a13fe61703" width="666" /> 
</br>
<img src="https://github.com/chanQvQ/chanblog/assets/145744078/cc741774-8e31-49f4-831c-04fec7e85131" width="666" />



使用方法：</br></br>
1.clone 下来 分别 npm i 初始化</br>
2.server:  node app.js</br>
3.client：npm run dev</br>
(按照步骤来)

notice：</br></br>
1.后台管理的默认账号为：admin  密码：123 </br>
 忘记密码：</br>client>src>views>login.vue 里自定义找回密码验证内容   =>回答错误不调用（前端控制）</br></br>
           server>routers>login.js 里对应client的验证内容 => 强行调用该接口也要回答正确才能调用(后端保证接口安全)</br></br>
  忘记密码=修改密码 （当时个人使用懒得做修改密码接口了）

2.接口文档全在client>src>api的注释里

3.本项目请配合代码注释使用

4.关于界面自定义去介绍自己吧，练练CSS

5.样式方面欣赏水平有限，这些都是可以你自己随便安排的，主要是功能的实现。

6.供Vue3和Nodejs初学者或项目经验不足者学习Vue3+pinia+wangEditor+nodejs+express，学习完后可自己做到从0-1开发，更好的了解后端（了解！了解！了解！）。大佬无视，也可以给点建议或批评。

7.bug、建议、疑惑、批评请前往留言板，项目上线地址http://162.14.68.216/



