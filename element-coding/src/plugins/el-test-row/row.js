export default {
  // 驼峰命名法
  name: 'ElTestRow',

  render(h) {
    return h('div',{
      class: 'el-test-row'
    }, this.$slots.default)
  },
}