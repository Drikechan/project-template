<template>
  <div>
    <svg width="440" height="440" viewbox="0 0 440 440">
      <circle cx="220" cy="220" r="170" stroke-width="50" stroke="#D1D3D7" fill="none"></circle>
      <circle
          class="circle"
          cx="220"
          cy="220"
          r="170"
          stroke-width="50"
          stroke="#00A5E0"
          fill="none"
          transform="matrix(0,-1,1,0,0,440)"
      />
    </svg>
    <tab-index></tab-index>
  </div>
</template>

<script>
import TabIndex from '@/Components/index.vue'
export default {
  name: 'SvgAnimation',
  components: {
    TabIndex
  },
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
.circle {
  animation: circle 5s linear infinite;
}

@keyframes circle {
  from {
    stroke-dasharray: 0 1069;
  }
  to {
    stroke-dasharray: 1069 0;
  }
}
</style>
