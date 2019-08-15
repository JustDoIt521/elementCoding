<template>
  <div id="home">
    <input @compositionstart="testStart" @compositionend="testEnd">
    <el-input size="small" lable="input输入框" v-model="inputValue" style="width:20rem;"></el-input>
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
      inputValue: ''
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

