// import huawei from './huawei.png';
// import './index.scss';
// import './style.scss';
// import '@babel/polyfill';
// import _ from 'lodash';
// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'

// Vue.use(ElementUI, { locale })
import Vue from 'vue';
import App from './App.vue';
// const container = document.getElementById('container');
// const canvas = document.createElement('canvas');
// console.log(canvas);
// // container.innerHTML = '123';
// // container.style.color = 'red';
// let imgDom = new Image();
// // console.log(imgDom);
// canvas.setAttribute('id', 'canvas');
// canvas.style.width = '700px';
// canvas.style.height = '700px';
// canvas.style.fontSize = '18px';
// const context = canvas.getContext('2d');
// document.body.appendChild(canvas);
// window.onload = function () {
//     context.drawImage(imgDom, 0, 0, 300, 300);
// }
// console.log(canvas);
// canvas.addEventListener('click', function (event) {

//     context.fillStyle = '#fff';
//     context.strokeStyle = '#fff'; 
//     context.font = "bold 40px ,'微软雅黑','宋体'"; 
//     // context.textBaseline = 'hanging'; 
//     context.fillText(event.clientX, event.clientX - 200, event.clientY- 500); 
//     console.log(event.clientX, event.clientY);
// })
// imgDom.src = huawei;

// imgDom.src = huawei;
// imgDom.style.position="reactive";
// container.appendChild(imgDom);
// document.addEventListener('click', function(event) {
//     console.log(event.clientX);
//     console.log(event.clientY);
//     imgDom.innerHTML = event.clientX;
// })

// container.innerHTML = '<div class="iconfont shuaxin" style="font-size: 16px"></div>';
// function loadPromise() {
//     // Promise.resolve().then(() => {
//     //     alert(1);
//     // })

//     // const a = 1;
//     // return a;
//     return new Promise((resolve, reject) => {
//         resolve();
//         alert(22222);
//     })
// }
// console.log(loadPromise());

// index.js中
// import 'regenerator-runtime/runtime';

// const arr = [
//     new Promise(() => {}),
//     new Promise(() => {})
// ]
// arr.map(item => {
//     console.log(item)
// })

// console.log(_.join(['a', 'b', 'c'], '~'));
// function getComponent() {
//     return import('lodash').then(_ => {
//         console.log(_.join(['a', 'b', 'c'], '~'));
//     })
// }
// document.addEventListener('click', function() {
//     import('lodash').then(_ => {
//         console.log(_.join(['a', 'b', 'c'], '~'));
//     })
// })
new Vue({

    render: h => h(App)
  }).$mount('#container')