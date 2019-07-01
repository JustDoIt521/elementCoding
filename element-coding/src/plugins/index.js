import ElTestRow from "./el-test-row/row.js"
import ElTestCol from "./el-test-col/col.js"
import ElTestContainer from "./el-test-container/container"

const components = [ElTestRow, ElTestCol, ElTestContainer]

const install = function (Vue){
  //注册组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if(typeof window !== undefined && window.Vue) {
  console.log('using install')
}


//Vue.use会检测引入的组件中是否包含install方法，并执行该方法
export default {
  install
}