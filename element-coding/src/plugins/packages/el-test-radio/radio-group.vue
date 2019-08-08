<template>
  <div
    class="el-radio-group"
    role="radioGroup"
    @keydown="handleKeyDown"
  >
    <slot></slot>
  </div>
</template>
<script>
import Emitter from "@/plugins/mixins/emitter.js";
// 上下左右键码
const keyCode = Object.freeze({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
});
export default {
  name: "ElTestRadioGroup",

  componentName: "ElTestRadioGroup",

  // 集成自el-form的属性
  inject: {
    elFormItem: {
      default: ''
    }
  },

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
      return (this.elFormItem || {}).elFormItemsSize;
    },

    radioGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  created() {
    // 定义一个监听函数
    this.$on("handleChange", value => {
      this.$emit("change", value);
    });
  },

  mounted() {
    // 当radioGroup没有默认选项时，第一个可以选中Tab导航
    const radios = this.$el.querySelectorAll("[type=radio]");
    const firstLabel = this.$el.querySelectorAll("[role=radio]")[0];
    if (![].some.call(radios, radio => radio.checked) && firstLabel) {
      firstLabel.tabIndex = 0;
      console.warn(1)
    }
  },

  methods: {
    // 上下左右按键 触发radio
    handleKeyDown (e) {
      // 获取触发该事件的节点
      const  target = e.target;
      // 判断是否是原生input节点
      const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]'
      const radios = this.$el.querySelectorAll(className);
      const length = radios.length;
      const index = [].indexOf.call(radios, target)
      const roleRadios = this.$el.querySelectorAll('[role=radio]')
      switch (e.keyCode) {
        case keyCode.LEFT:
        case keyCode.UP:
        // (删除这两个事件好像没什么变化)
          // 阻止事件的传播 阻止该事件配分派到其他节点上 
          e.stopPropagation();
          //如果此事件没有被显式处理，那么它默认的动作也不要做（因为默认是要做的）。此事件还是继续传播，除非碰到事件侦听器调用stopPropagation() 或stopImmediatePropagation()，才停止传播
          e.preventDefault();
          if (index === 0) {
            roleRadios[length - 1].click();
            roleRadios[length - 1].focus();
          } else {
            roleRadios[index - 1].click();
            roleRadios[index - 1].focus();
          }
          break;
        case keyCode.RIGHT:
        case keyCode.DOWN:
          if (index === (length - 1)) {
            e.stopPropagation();
            e.preventDefault();
            roleRadios[0].click();
            roleRadios[0].focus();
          } else {
            roleRadios[index + 1].click();
            roleRadios[index + 1].focus();
          }
          break;
        default:
          break;
      }
    }
  },

  watch: {
    value () {
      this.dispatch('ElformItem', 'el.form.change', [this.value])
    }
  }
};
</script>
