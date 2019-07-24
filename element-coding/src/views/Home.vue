<template>
  <div class="home">
    <el-radio-group v-model="radio" ref="radioGroup">
    <el-radio label="1"></el-radio>
    <el-radio label="2"></el-radio>
    <el-radio label="3"></el-radio>
    <!-- <el-radio v-model="radio" label="4"></el-radio> -->
    </el-radio-group>
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
    console.warn(this.$children)
    console.warn(this.$children[0].value)
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

