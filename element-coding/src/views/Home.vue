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

    <div style="line-height:20px;">
      line-height:20px
      <div style="font-size:20px;">
        20px child
      </div>
    </div>
    <div style="line-height:1.5">
      line-height:1.5
      <div style="font-size:20px;">
        1.5 child
      </div>
    </div>
    <div style="line-height:150%;">
      line-height:150%
      <div style="font-size:20px;">
        150% child
      </div>
    </div>
    <div style="line-height:normal">
      line-height:normal
      <div style="font-size:20px;">
        normal child
      </div>
    </div>
    <el-test-button>222</el-test-button>
    <div class="demo1">demo1</div>
    <div class="demo2">demo2</div>
    <div class="demo3">demo3</div>
    <div class="demo4" width='33'>demo4</div>
    <div class="demo5" width='44'>demo5</div>
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
.demo1+.demo2{
  border:1px solid red;
}
.demo3{
  width:30px;
}
.demo4{
  height:30px;
}
div[width='33']{
  border: 1px solid  blue;
}
</style>

