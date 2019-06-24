<template>
  <div class="home">
    <el-test-row>
      <el-test-col :span="2"></el-test-col>
      <el-test-col :span="8"></el-test-col>
    </el-test-row>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
