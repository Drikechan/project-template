<template>
  <div class="container">{{ message }}</div>
</template>

<script>
export default {
  name: "TabIndex",
  data:() => ({
    message: 'ghgfhfg'
  }),
  created() {
    this.handler()
  },
  methods: {
    handler() {
      let task = setTimeout(() => {
        this.message = 'sadasdasdasdas'
      }, 1000)
      task && clearTimeout(task);
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100px;
  background-color: red;
  color: blue;
}
</style>
