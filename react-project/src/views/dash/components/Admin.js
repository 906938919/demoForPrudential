// import LineAdvance from "./bizcharts/LineAdvance"
// import Interval from "./bizcharts/Interval"
// import BizCharts from "./bizcharts/BizCharts"

import LineCharts from "./echarts/LineCharts"
import BarCharts from "./echarts/BarCharts"
import PieCharts from "./echarts/PieCharts"




export default () => {
  return (
    <div>
      {/* <LineAdvance />
      <Interval />
      <BizCharts /> */}
      <LineCharts />
      <BarCharts />
      <PieCharts />
    </div>
  )
}