<template>
  <div class="home">
    <el-test-radio v-model="radio" label="1"></el-test-radio>
    <el-test-radio v-model="radio" label="2"></el-test-radio>
    <el-test-radio v-model="radio" label="3"></el-test-radio>

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
      inputValue: '222',
      radioValue: ''
    }
  },
  mounted() {
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

