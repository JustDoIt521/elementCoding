import ElTestRow from "./packages/el-test-row/row.js"
import ElTestCol from "./packages/el-test-col/col.js"
import ElTestContainer from "./packages/el-test-container/container"
import ElTestHeader from "./packages/el-test-header/header"
import ElTestFooter from "./packages/el-test-footer/footer"
import ElTestAside from "./packages/el-test-aside/aside"
import ElTestMain from "./packages/el-test-main/main"
import ElTestButton from "./packages/el-test-button/button"
import ElTestButtonGroup from "./packages/el-test-button/buttonGroup"
import ElTestRadio from "./packages/el-test-radio/radio"
import ElTestRadioGroup from "./packages/el-test-radio/radio-group"
import ElTestInput from "./packages/el-test-input/input"



const components = [
  ElTestRow, 
  ElTestCol, 
  ElTestContainer, 
  ElTestHeader, 
  ElTestFooter, 
  ElTestAside, 
  ElTestMain,
  ElTestButton,
  ElTestButtonGroup,
  ElTestRadio,
  ElTestRadioGroup,
  ElTestInput
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