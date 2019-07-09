import ElTestRow from "./el-test-row/row.js"
import ElTestCol from "./el-test-col/col.js"
import ElTestContainer from "./el-test-container/container"
import ElTestHeader from "./el-test-header/header"
import ElTestFooter from "./el-test-footer/footer"
import ElTestAside from "./el-test-aside/aside"
import ElTestMain from "./el-test-main/main"
import ElTestButton from "./el-test-button/button"


const components = [
  ElTestRow, 
  ElTestCol, 
  ElTestContainer, 
  ElTestHeader, 
  ElTestFooter, 
  ElTestAside, 
  ElTestMain,
  ElTestButton
]

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