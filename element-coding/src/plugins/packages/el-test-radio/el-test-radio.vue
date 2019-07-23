<template>
  <label
    class="el-test-radio"
    :class="[
      // radios大小仅在border为true时有效
      border && radioSize? 'el-test-radio--' + radioSize : '',
      // 是否禁用
      {'is-test-disabled': isDisabled},
      {'is-test-focus': focus},
      // 是否显示边框
      {'is-test-bordered': border},
      // 是否选中当前按钮
      {'is-test-checked': model === label}
    ]"
    role="radio"
    :aria-checked="model===label"
    :aria-disabled="isDisabled"
    :tabIndex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span class="el-test-radio__input"
      :class="{
        'is-test-disabled': isDisabled,
        'is-checked': model === label  
      }"
    >
      <span class="el-test-radio__inner"></span>
        <input 
          ref="radio"
          class="el-test-radio__original"
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

      <span class="el-test-radio__label" @keydown.stop>
        <slot></slot>
        <!-- 如果没有设置radio显示的值  则显示label值 -->
        <template v-if="!slots.default">{{label}}</template>
      </span>
  </label>
</template>
<script>
// 引入分发广播事件
import {emitter} from "@/plugins/mixins/emitter.js"
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
      focus: false   //元素聚焦 以及 失去焦点时触发  通过是否聚焦改变样式变化
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
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this,model)
        this.isGroup && this.dispatch('ElTestRadioGroup', 'handleChange', this.model)
      })
    }
  }
}

/**
 * tabIndex
 * mixnis
 * aria-hidden   残障人士如失明的人使用识读设备（自动读取内容并自动播放出来），播放到带此属性的内容时会自动跳过，以免残障人士混淆！
 * focus
 * blur  
 */
</script>
