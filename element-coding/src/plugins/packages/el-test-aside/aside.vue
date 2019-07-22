<template>
  <aside class="el-test-aside" :style="{width}">
    <slot></slot>
  </aside>
</template>
<script>
export default {
  name: 'ElTestAside',

  component: 'ElTestAside',

  props: {
    width: {
      type: String,
      default: '300px'
    }
  }
}
</script>

