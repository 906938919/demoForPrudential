import TabBar from "@/components/TabBar";
import { Card, InfiniteScroll } from 'antd-mobile'
import { useState } from "react";
import styles from './index.module.css'
export default () => {

  // const list = [
  //   { title: "小蒋", content: "酱紫剑？" },
  //   { title: "小蒋", content: "酱紫菜？" },
  //   { title: "小蒋", content: "酱紫独？" },
  //   { title: "小蒋", content: "酱紫玩？" },
  //   { title: "小蒋", content: "酱紫骚？" },
  //   { title: "小蒋", content: "酱紫窜？" },
  // ]
  const [list, setList] = useState(
    [{ title: "小蒋", content: "酱紫剑？" },
    { title: "小蒋", content: "酱紫菜？" },
    { title: "小蒋", content: "酱紫独？" },
    { title: "小蒋", content: "酱紫玩？" },
    { title: "小蒋", content: "酱紫骚？" },
    { title: "小蒋", content: "酱紫窜？" },]
  )

  const append = [{ title: "小蒋", content: "酱紫剑？" },
  { title: "小蒋", content: "酱紫菜？" },
  { title: "小蒋", content: "酱紫独？" },
  { title: "小蒋", content: "酱紫玩？" },
  { title: "小蒋", content: "酱紫骚？" },
  { title: "小蒋", content: "酱紫窜？" },]

  async function loadMore(list: any) {
    setList([...list, ...append])
  }

  return (
    <div>
      <h1>小蒋酱紫剑</h1>
      {
        list.map(ele => (
          <Card
            headerStyle={{
              color: '#1677ff',
            }}
            title={ele.title}
            style={{ marginTop: "20px", background: "#ccc" }}
          >
            {ele.content}
          </Card>
        ))
      }
      <InfiniteScroll loadMore={() => loadMore(list)} hasMore={true} />
      <TabBar />
    </div>
  );
}
