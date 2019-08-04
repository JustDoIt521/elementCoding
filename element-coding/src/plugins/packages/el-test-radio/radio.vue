<template>
  <label
    class="el-radio"
    :class="[
      // radio大小仅在border为true时有效
      border && radioSize? 'el-radio--' + radioSize : '',
      // 是否禁用
      {'is-disabled': isDisabled},
      // 焦点是否在此处
      {'is-focus': focus},
      // 是否显示边框
      {'is-bordered': border},
      // 是否选中当前按钮
      {'is-checked': model === label}
    ]"
    role="radio"
    :aria-checked="model===label"
    :aria-disabled="isDisabled"
    :tabIndex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span class="el-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label  
      }"
    >
      <span class="el-radio__inner"></span>
        <input 
          ref="radio"
          class="el-radio__original"
          :value="label"
          type="radio"
          aria-hidden="true"
          v-model="model"
          @focus="focus = true"
          @blur="focus=false"
          @change="handleChange"
          :name="name"
          :disabled="isDisabled"
          tabindex="-1"
        >
      </span>

      <!-- keydown.stop 阻止事件继续冒泡 -->
      <span class="el-radio__label" @keydown.stop>
        <slot></slot>
        <!-- 如果没有设置radio显示的值  则显示label值 -->
        <template v-if="!$slots.default">{{label}}</template>
      </span>
  </label>
</template>
<script>
// 引入分发广播事件
import emitter from "@/plugins/mixins/emitter.js"
export default {
  name: 'ElTestRadio',

  componentName: 'ElTestRadio',

  mixins: [emitter],

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String
  },

  data () {
    return {
      focus: false,   //元素聚焦 以及 失去焦点时触发  通过是否聚焦改变样式变化
    }
  },

  computed: {
    // 遍历父组件结构  找寻是否含有radioGroup组件 
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'ElTestRadioGroup') {
          parent = parent.$parent
        } else {
          // eslint-disable-next-line
          this._radioGroup = parent
          return true
        }
      }
      return false
    },

    model: {
      get() {
        // 如果是以el-radio-group包裹 则取group的value值
        return this.isGroup ? this._radioGroup.value : this.value
      },

      set(val) {
        console.warn(val)
        if (this.isGroup) {
          this.dispatch('ElTestRadioGroup', 'input', [val])
        } else {
          this.$emit('input', val)
        }
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label)
      }
    },

      // 如果属于form元素  则元素大小受控制于form的大小
     _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
    },

    // radio大小
    radioSize() {
      const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
      return this.isGroup
        ? this._radioGroup.radioGroupSize || temRadioSize
        : temRadioSize
        
    },

    // 是否禁用
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled || (this.elTestForm || {}).disabled
        : this.disabled || (this.elTestForm || {}).disabled
    },

    // 管理radio是否可以由tab选中
    tabIndex() {
      return (this.isDisabled || (this.isGroup && this.model !== this.label))  ? -1 : 0
    }
  },

  methods: {
    test1() {
      console.log('mouseDown')
    },
    test2() {
      console.log('click')
    },
    handleChange() {
      console.log('change')
      this.$nextTick(() => {
        this.$emit('change', this.model)
        // 根据是否是group调用 分发dispatch事件
        this.isGroup && this.dispatch('ElTestRadioGroup', 'handleChange', this.model)
      })
    }
  }
}

</script>
