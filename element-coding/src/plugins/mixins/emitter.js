function broadcast(componentName, eventName, params) {
  console.log(componentName, eventName, params)
  // 子元素遍历
  this.$children.forEach(child => {
    // 获取子元素的名字
    var name = child.$options.componentName
    // 如果子元素名字 和 组件名字相同 触发子组件emit事件
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    // 分发事件
    dispatch(componentName, eventName, params) {
      console.warn(componentName, eventName, params)
      console.log([eventName].concat(params));
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName
      console.log(parent)
      while (parent && (!name || name !== componentName)) {
        console.log('while')
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        console.warn('if')
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    // 广播事件 向子组件广播事件
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  },
}