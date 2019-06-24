import ElTestRow from "./el-test-row/row.js"
import ElTestCol from "./el-test-col/col.js"

const components = [ElTestRow, ElTestCol]

export default function install(Vue){
  //注册组件
  console.log(components)
  components.forEach(component => {
    console.log(component)
    Vue.component(component.name, component)
  })
}

if(typeof window !== undefined && window.Vue) {
  console.log('using install')
  // install(window.Vue)
}

// export default {
//   install
// }