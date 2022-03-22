<template>
  <div id="container" @click="handlerPage">
<!--    <svg width="440" height="440" viewbox="0 0 440 440">-->
<!--      <circle cx="220" cy="220" r="170" stroke-width="10" stroke="#D1D3D7" fill="none"  stroke-dasharray="267">-->
<!--        <animateTransform attributeName="transform" type="rotate" values="0 220 220;360 220 220" dur="1s" repeatCount="indefinite"></animateTransform>-->
<!--        <animate attributeName="stroke"  repeatCount="indefinite" values="#7FFFD4;#00A5E0;#7FFFD4;" dur="1s"></animate>-->
<!--      </circle>-->
<!--      <circle-->
<!--          class="circle"-->
<!--          cx="220"-->
<!--          cy="220"-->
<!--          r="130" -->
<!--          stroke-width="10"-->
<!--          stroke="#00A5E0"-->
<!--          fill="none"-->
<!--          stroke-dasharray="204"-->
<!--      >-->
<!--        <animateTransform attributeName="transform" type="rotate" values="360 220 220;0 220 220" dur="1s" repeatCount="indefinite"></animateTransform>-->
<!--        <animate attributeName="stroke"  repeatCount="indefinite" values="#00A5E0;#7FFFD4;#00A5E0;" dur="1s"></animate>-->
<!--      </circle>-->
<!--    </svg>-->
<!--    <svg t="1642226370481" class="icon" viewBox="0 0 1024 1024"  width="200" height="200"><path d="M923.9 903.8H100.1c-12.9 0-24.8-6.9-31.3-18.1-6.4-11.2-6.4-25 0-36.1l411.9-711.5c6.5-11.2 18.4-18 31.2-18 12.9 0 24.8 6.9 31.2 18L955 849.6c6.5 11.2 6.5 24.9 0 36.1-6.3 11.2-18.2 18.1-31.1 18.1z m-761.2-72.2h698.5L512 228.3 162.7 831.6z" ></path><path d="M512 772.8c-19.9 0-36.1-16.2-36.1-36.1V718c0-19.9 16.2-36.1 36.1-36.1 19.9 0 36.1 16.2 36.1 36.1v18.7c0 19.9-16.2 36.1-36.1 36.1zM512.2 641.7c-19.9 0-36.1-16.1-36.1-36.1l-0.2-187.2c0-19.9 16.1-36.1 36.1-36.1 19.9 0 36.1 16.1 36.1 36.1l0.2 187.2c0 19.9-16.2 36.1-36.1 36.1z" ></path></svg>-->
    <svg width="200" height="200" viewBox="0 0 200 200">
<!--      <path stroke="black"  d="M 10 80, C40 10, 55, 10,  90 80Z" ></path>-->
      <path d="M10 40, 30 10, 50 40Z" stroke="black" fill="transparent"></path>
      <path d="M30 15,  30 30Z" stroke="black" fill="transparent" ></path>
      <path d="M30 33,  30 36Z" stroke="black" fill="transparent" ></path>
    </svg>

<!--    <svg viewBox="0 0 200 200">-->
<!--      <rect x="10" y="10" width="30" height="20" fill="green" />-->

      <!--
      In the following example we are applying the matrix:
      [a c e]    [3 -1 30]
      [b d f] => [1  3 40]
      [0 0 1]    [0  0  1]

      which transform the rectangle as such:

      top left corner: oldX=10 oldY=10
      newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 10 + 30 = 50
      newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 10 + 40 = 80

      top right corner: oldX=40 oldY=10
      newX = a * oldX + c * oldY + e = 3 * 40  - 1 * 10 + 30 = 140
      newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 10 + 40 = 110

      bottom left corner: oldX=10 oldY=30
      newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 30 + 30 = 30
      newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 30 + 40 = 140

      bottom right corner: oldX=40 oldY=30
      newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 30 + 30 = 120
      newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 30 + 40 = 170
      -->
<!--      <rect x="10" y="10" width="30" height="20" fill="red"  transform="matrix(3 1 -1 3 30 40)"/>-->
<!--    </svg>-->

    <svg viewBox="0 0 200 200">

      <rect x="10" y="10" width="30" height="20" fill="red"  transform="matrix(0.6 0 0 1.5 3.3 -5)"/>
    </svg>
    [0.6, 0, 3.3]
    [0, 1.5,-5]

  </div>
</template>

<script>
export default {
  name: 'SvgAnimation',
  created() {
    this.handlerPage()
  },
  methods: {
    handlerPage() {
      let res = {}
      console.log(res.code?.length.code, '<<<<<<<')
      window.onload = function(){
        document.getElementById('container').addEventListener('click',e => {
          console.log(window['aaa'].bbbbbb) //此处window['aaa']为undifine，所以这里一定会报错

          console.log(window['aaa'].aaa) //此处window['aaa']为undifine，所以这里一定会报错
        }, false)
      }
      return new Promise((resolve, reject) => {
        console.log(2)
        resolve()
      })
    }
  }
}
</script>

<style scoped>
/*.circle {*/
/*  animation: circle 5s linear infinite;*/
/*}*/

/*@keyframes circle {*/
/*  from {*/
/*    stroke-dasharray: 0 1069;*/
/*  }*/
/*  to {*/
/*    stroke-dasharray: 1069 0;*/
/*  }*/
/*}*/
.container {
  width: inherit;
  clear: both;
}
</style>
