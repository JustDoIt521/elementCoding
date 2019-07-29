<template>
  <div class="home">
    <el-test-radio v-model="radio" label="1" :disabled="true"></el-test-radio>
    <el-test-radio v-model="radio" label="2"></el-test-radio>
    <el-test-radio v-model="radio" label="3"></el-test-radio>
    <!-- <el-radio v-model="radio" label="4"></el-radio> -->

    <input type="radio" name="first" value="first_1">
    <input type="radio" name="first" value="first_2">
    <input type="radio" name="first" value="first_3">
    <!-- <el-test-radio v-model="radio" label="4"></el-test-radio>
    <el-test-radio v-model="radio" label="5"></el-test-radio>
    <el-test-radio v-model="radio" label="6"></el-test-radio> -->
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
      radio: '4'
    }
  },
  mounted() {
    // console.warn(this.$children)
    // console.warn(this.$children[0].value)
  },
  methods: {
    handleClick: function(){
      this.gutter++;
    }
  },
}
</script>
<style>
</style>

