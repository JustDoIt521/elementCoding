export default {
  name: 'ElTestCol',

  // col组件所接受参数
  props: {
    // 宽度 默认为24
    span: {
      type: Number,
      default: 24
    },

    // 偏移量 默认为0
    offset: {
      type: Number,
      default: 0
    }
  },

  computed: {
    gutter () {
      let parent = this.$parent
      
      return parent ? parent.gutter : 0
    }
  },

  render(h) {
    console.log(this.$parent)
    let classStyle = [];
    let style = {}

    if (this.gutter) {
      style.marginLeft = `${this.gutter/2}px`
      style.marginRight = style.marginLeft
    }

    // 遍历属性 查询对应的class
    ['span', 'offset'].forEach(prop => {
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