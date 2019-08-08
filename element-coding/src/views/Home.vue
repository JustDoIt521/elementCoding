<template>
  <div class="home">
    <el-test-radio-group v-model="radio">
    <!-- <el-test-radio -->
      <el-test-radio label="1"></el-test-radio>
      <el-test-radio label="2"></el-test-radio>
      <el-test-radio label="3"></el-test-radio>
    </el-test-radio-group>

    <el-radio-group v-model="radio1">
    <!-- <el-test-radio -->
      <el-radio label="6"></el-radio>
      <el-radio label="7"></el-radio>
      <el-radio label="8"></el-radio>
    </el-radio-group>
    <input :value="radio" :input="changeInput" type="radio">
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
      gutter: 0,
      radio: '4',
      radio1: '',
      inputValue: '222',
      radioValue: ''
    }
  },
  mounted() {
    // const radios = this.$el.querySelectorAll('[type=radio]');
    // console.log(radios)
    // let m1 = [1, 2, 3, 4, 5]
    // let m2 = [6, 7, 8, 9, 10]
    // let test = m1.some.call([], value => value === 9)
    // console.warn(test)
    // console.warn(this.$children)
    // console.warn(this.$children[0].value)
  },
  methods: {
    changeInput(val) {
      console.warn(val)
    }
  },
}
</script>
<style>
</style>

