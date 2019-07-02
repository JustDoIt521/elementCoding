<template>
  <div class="home">
    <el-container>
      <el-header>header</el-header>
      <el-container>
        <el-aside>aside</el-aside>
        <el-main>main</el-main>
      </el-container>
      <el-footer>footer</el-footer>
    </el-container>

    
    <el-test-container>
      <el-test-header>header</el-test-header>
      <el-test-container>
        <el-test-aside>aside</el-test-aside>
        <el-test-main>main</el-test-main>
      </el-test-container>
      <el-test-footer>footer</el-test-footer>
    </el-test-container>

    <div style="display:flex">
      <div style="flex:1;border:1px solid red;height:30px;"></div>
      <div style="flex:2;border:1px solid green;height:30px;"></div>
    </div>
    <div style="display:flex">
      <div style="flex:0 1 1000px;border:1px solid red;height:30px;"></div>
      <div style="flex:0 4 1000px;border:1px solid green;height:30px;"></div>
    </div>
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
      gutter: 0
    }
  },
  methods: {
  },
}
</script>
<style>
</style>

