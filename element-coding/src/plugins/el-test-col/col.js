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

  render(h) {
    let classStyle = [];

    // 遍历属性 查询对应的class
    //Ps element的设计真的好
    ['span', 'offset'].forEach(prop => {
      console.log(prop)
        classStyle.push(
          prop !== 'span'?
          `el-test-col-${prop}-${this[prop]}`:
          `el-test-col-${this[prop]}`
        )
    })
    return h('div', 
    {
      class: ['el-test-col', classStyle]
    }, 
    this.$slots.default)
  },
}