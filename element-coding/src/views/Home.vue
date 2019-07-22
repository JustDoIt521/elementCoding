<template>
  <div class="home">
    <el-radio v-model="radio"></el-radio>
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
      radio: ''
    }
  },
  mounted() {
    console.warn(this.$children)
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

