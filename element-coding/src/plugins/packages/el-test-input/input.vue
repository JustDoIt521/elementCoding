<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input---' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-exceed': inputExceed,
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend,
      'el-input-prefix': $slots.prefix || prefixIcon,
      'el-input-suffix': $slots.suffix || suffixIcon || cleadable || showPassword
    }
  ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素插槽  标签 组件等-->
      <div class="el-input-group__prepend" v-if="$slots.append">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label">
      <!-- 前置内容 -->
      <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="el-input__icon"
          v-if="prefixIcon"
          :class="prefixIcon"
        >
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="el-input__suffix"
        v-if="getSuffixVisible()">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear || showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="el-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-if="showClear"
            class="el-input_icon el-icon-circle-close el-input__clear"
            @click="clear">
          </i>
          <i v-if="showPwdVisible"
            class="el-input_icon el-icon-view el-input__clear"
            @click="handlePasswordVisible">
          </i>
          <span v-if="isWordLimitVisible" class="el-input_count">
            <span class="el-input__count__inner">
              {{textLength}} / {{upperLimit}}
            </span>
          </span>
        </span>
        <i class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabIndex="tabIndex"
      class="el-textarea__inner"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    > 
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" class="el-input__count">{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>
<script>
import emitter from '@/plugins/mixins/emitter.js'
export default {
  name: 'elTestInput',
  componentName: 'ElTestInput',
  
  mixins: [emitter],
  
  // 这个属性干嘛的？
  inhertAttrs: false,

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data () {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    }
  },

  props: {
    value: [String, Number],
    // input框大小
    size: String,
    // 是否可被用户缩放
    resize: String,
    // 原生form属性
    form: String,
    // 是否禁用
    disabled: Boolean,
    // 设置是否只读
    readonly: Boolean,
    // input为text或者textarea
    type: {
      type: String,
      default: 'text'
    },
    // 自适应高度 只对 type="textarea有效"
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    // 自动补全
    autocomplate: {
      type: String,
      default: 'off'
    },
    autoComplate: {
      type: String,
      // 自定义默认标准
      validator () {
        process.env.NODE_DEV !== 'production' && console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
        return true
      }
    },
    // 是否在输入的时候触发表单校验
    validateEvent: {
      type: Boolean,
      default: true
    },
    // 输入框尾部图标
    suffixIcon: String,
    // 输入框头部图标
    prefixIcon: String,
    // 输入框关联的label字段 ? 
    label: String,
    // 是否显示清除按钮
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否显示密码切换图标
    showPassword: {
      type: Boolean,
      default: false
    },

    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabIndex: String
  },
  computed: {
    // 可受控于外部form大小
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : ''
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false
    },
    validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, {resize: this.resize})
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value)
    },
    showClear() {
      return this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
    },
    showPwdVisible() {
      return this.showWordLimit &&
        !this.inputDisabled &&
        !this.readonly &&
        (!!this.nativeInputValue || this.focused)
    },
    isWordLimitVisible() {
      return this.showWordLimit && 
        this.$attrs.maxlength &&
        (this.type === 'text' || this.type === 'textarea') &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword
    },
    upperLimit() {
      return this.$attrs.maxlength
    },
    textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length
      }
      return (this.value || '').length
    },
    inputExceed() {
      return this.isWordLimitVisible && 
        (this.textLength > this.upperLimit)
    }
  },
  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea)
      if (this.validateEvent) {
        this.diispatch('ElFormItem', 'el.form.change', [val])
      }
    },
    nativeInputValue() {
      this.setNativeInputValue()
    },
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue()
        this.resizeTextarea()
        this.updateIconOffset()
      })
    }
  },
  methods: {
    focus() {
      this.getInput().focus()
    },
    blur() {
      this.getInput().blur()
    },
    getMigratingConfig() {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      }
    },
    handleBlur(event) {
      this.focus = false
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value])
      }
    },
    select() {
      this.getInput().select()
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const { autosize, type} = this
      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows
      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
    },
    setNativeInputValue() {
      const input = this.getInput()
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue
    },
    handleFocus(event) {
      this.focus = true
      this.$emit('focus', event)
    },
    handleCompositionStart() {
      this.isComposing = true
    },
    handleCompositionEnd(event) {
      this.isComposing = false
      this.handleInput(event)
    },
    handleInput(event) {
      if (this.isComposing) return;
      if (event.target.value === this.nativeInputValue) return
      this.$emit('input', event.target.value)
      this.$nextTick(this.setNativeInputValue)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    calcIconOffset(place) {
      let elList = [].slice.call(this.$el.querySelectorAll(`.el-input__${place}`) || [])
      if (!elList.length) return;
      let el = null
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      if (!el) return;
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      }
      const pendant = pendantMap[place]
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelectorAll(`.el-input-group__${pandent}`).offsetWidth}px`
      } else {
        el.removeAttribute('style')
      }
    },
    updateIconOffset() {
      this.calcIconOffset('prefix')
      this.calcIconOffset('suffix')
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
      this.focus()
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea
    },
    getSuffixVisible() {
      return this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible ||
        (this.validateState && this.needStatusIcon)
    }
  },
  created() {
    this.$on('inputSelect', this.select)
  },
  mounted() {
    this.setNativeInputValue()
    this.resizeTextarea()
    this.updateIconOffset()
  },
  updated() {
    this.$nextTick(this.updateIconOffset)
  }
}
</script>

