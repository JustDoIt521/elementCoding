<template>
  <button class="el-test-button"
    @click="handelClick"
    :disabled="buttonDisabled || loading"
    :type="nativeType"
    :class="[
      type ? 'el-test-button--' + type : '',
      buttonSize ? 'el-test-button--' + buttonSize : '',
      {
        'is-test-disabled': buttonDisabled,
        'is-test-loading': loading,
        'is-test-plain': plain,
        'is-test-round': round,
        'is-test-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'ElTestButton',
  componentsName: 'ElTestButton',
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'default'
    },
    // 按钮大小
    size: String,
    // 图标
    icon: {
      type: String,
      default: ''
    },
    // 显示加载动画
    loading: Boolean,
    // 按钮是否可用
    disabled: Boolean,
    // 是否朴素按钮
    plain: Boolean,
    //是否圆角按钮
    round: Boolean,
    //是否圆形按钮
    circle: Boolean
  },
  methods: {
    handleCiclk(evt) {
      this.$emit('click', evt);
    }
  },
}
</script>

