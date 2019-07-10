export default {
  // 驼峰命名法
  name: 'ElTestRow',
  componentName: 'ElTestRow',
  props: {
    gutter: Number,
    // 渲染的标签类型
    tag: {
      type: String,
      default: 'div'
    },

    type: String,

    justify: {
      type: String,
      default: 'start'
    },

    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    style() {
      const ret = {}
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter/2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret
    }
  },

  render(h) {
    let classStyle = []

    //为什么在设置gutter的时候  父组件要设置margin？  是为了保证col第一个和最后一个仍然贴紧row的左侧和右侧  但是这样做会撑开el-row

    classStyle = [
      'el-test-row',
      this.justify !== 'start' ? `is-justify-content-${this.justify}` : '',
      this.align !== 'top' ? `is-align-items-${this.align}` : '',
      {'el-test-row-flex': this.type === 'flex'}
    ]

    return h(this.tag,{
      class: classStyle,
      style: this.style
    }, this.$slots.default)
  },
}