<template>
  <div class="home">
    <input @compositionstart="testStart" @compositionend="testEnd">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
    }
  },
  mounted() {
  },
  methods: {
    testStart () {
      console.log('sayHello')
    },

    testEnd () {
      console.log('sayBye')
    }
  },
}
</script>
<style>
</style>

