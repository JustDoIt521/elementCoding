<template>
  <label
    class="el-test-radio"
    :class="[
      border && radioSize? 'el-test-radio--' + radioSize : '',
      {'is-test-disabled': isDisabled},
      {'is-test-focus': focus},
      {'is-test-bordered': border},
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
        <template v-if="!slots.default">{{label}}</template>
      </span>
  </label>
</template>
<script>
export default {
  name: 'ElTestRadio',

  componentName: 'ElTestRadio',

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
      focus: false
    }
  },

  computed: {
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
    }
  },
}
</script>
