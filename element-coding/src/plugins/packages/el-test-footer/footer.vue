<template>
  <footer class="el-test-footer" :style="{height}">
    <slot></slot>
  </footer>
</template>
<script>
export default {
  name: 'ElTestFooter',

  componentName: 'ElTestFooter',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>

