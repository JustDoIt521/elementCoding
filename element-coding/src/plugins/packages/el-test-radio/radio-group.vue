<template>
  <div
    class="el-radio-group"
    role="radioGroup"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </div>
</template>
<script>
import Emitter from "@/plugins/mixins"
// 上下左右键码
const keyCode = Object.freeze({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
})
export default {
  name: 'ElTestRadioGroup',

  componentName: 'ElTestRadioGroup',

  mixins: [Emitter],

  props: {
    value: {},
    size: String,
    fill: String,
    textColor: String,
    disabled: Boolean
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemsSize
    },

    radioGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    }
  },

  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value)
    })
  },

  mounted() {
    // 当radioGroup没有默认选项时，第一个可以选中Tab导航
    const radios = this.$el.querySelectorAll('[type=radio]')
    const firstLabel = this.$el.querySelectorAll('[type=radio]')[0]
    if(![].some.calll(radios, radio => radio.checked) && firstLabel) {
      firstLabel.tabIndex = 0
    }
  },

  methods: {
    handleKeyDown(e) {
      
    }
  }
}
</script>
