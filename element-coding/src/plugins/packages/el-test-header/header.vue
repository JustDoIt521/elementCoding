<template>
  <header class="el-test-header" :style="{height}">
    <slot></slot>
  </header>
</template>
<script>
export default {
  name: 'ElTestHeader',

  componentName: 'ElTestHeader',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>

