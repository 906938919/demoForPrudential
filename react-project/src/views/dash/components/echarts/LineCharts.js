import { useEffect, useRef } from "react"
const echarts = window.echarts
export default () => {
  const ref = useRef(null)
  useEffect(() => {
    const myChart = echarts.init(ref.current)
    myChart.setOption({
      backgroundColor: '#fff',
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    })
  }, [])

  return (
    <div ref={ref} style={{ width: "100%", height: "500px" }} />
  )
}