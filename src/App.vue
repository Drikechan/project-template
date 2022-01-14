<template>
  <div>
    <svg width="440" height="440" viewbox="0 0 440 440">
      <circle cx="220" cy="220" r="170" stroke-width="10" stroke="#D1D3D7" fill="none"  stroke-dasharray="267">
        <animateTransform attributeName="transform" type="rotate" values="0 220 220;360 220 220" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="stroke"  repeatCount="indefinite" values="#7FFFD4;#00A5E0;#7FFFD4;" dur="1s"></animate>
      </circle>
      <circle
          class="circle"
          cx="220"
          cy="220"
          r="130"
          stroke-width="10"
          stroke="#00A5E0"
          fill="none"
          stroke-dasharray="204"
      >
        <animateTransform attributeName="transform" type="rotate" values="360 220 220;0 220 220" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="stroke"  repeatCount="indefinite" values="#00A5E0;#7FFFD4;#00A5E0;" dur="1s"></animate>
      </circle>
    </svg>
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
</style>
