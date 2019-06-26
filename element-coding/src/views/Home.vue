<template>
  <div class="home">
    <el-test-row type="flex" justify="center">
      <el-test-col :span="2">
        hello
      </el-test-col>
      <el-test-col :span="6">
        hello test
      </el-test-col>
    </el-test-row>

    <el-row type="flex" justify="center">
      <el-col :span="2" :offset="0">
        hello
      </el-col>
      <el-col :span="6">
        world
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  }
}
</script>
<style>
</style>

