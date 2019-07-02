<template>
  <!-- elemen为什么要用section不懂 -->
  <section class="el-test-container" :class="{'el-test-is-vertical': isVertical}">
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: 'ElTestContainer',

  componentName: 'ElTestContainer',

  props: {
    direction: String
  },

  computed: {
    isVertical() {
      if (this.direction === 'vertical') {
        return true
      } else if (this.direction === 'horizontal') {
        return false
      }
      
      console.log(this.$slots)
      console.log(this.$slots.default)

      // 遍历子节点 判断是否含有header  footer组件  elementApi中有描述 子元素含有 header 或 footer 时为子元素排列方向为 vertical 不然为 horizontal
      return this.$slots && this.$slots.default? 
      this.$slots.default.some(vnode => {
        let tag = vnode.componentOptions && vnode.componentOptions.tag
        return tag === 'el-test-header' || tag === 'el-test-footer'
      }) : false
    }
  },
}
</script>


