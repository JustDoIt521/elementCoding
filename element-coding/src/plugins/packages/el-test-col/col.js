export default {
  name: 'ElTestCol',

  // col组件所接受参数
  props: {
    // 宽度 默认为24
    span: {
      type: Number,
      default: 24
    },
    // 偏移量
    offset: Number,
    // 左侧偏移量
    pull: Number,
    // 右侧偏移量
    push: Number
  },

  computed: {
    gutter () {
      let parent = this.$parent
      while (parent && parent.$options.componentName !== 'ElTestRow') {
        parent = this.$parent
      }
      return parent ? parent.gutter : 0
    }
  },

  render(h) {
    let classStyle = []
    let style = {}

    if (this.gutter) {
      style.paddingLeft = `${this.gutter/2}px`
      style.paddingRight = style.paddingLeft
    }

    // 遍历属性 查询对应的class
    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      //保证属性存在时才添加class
      if(this[prop] || this[prop]===0)
        classStyle.push(
          prop !== 'span'?
          `el-test-col-${prop}-${this[prop]}`:
          `el-test-col-${this[prop]}`
        )
    })
    return h('div', 
    {
      class: ['el-test-col', classStyle],
      style
    }, 
    this.$slots.default)
  },
}