import { NextPage } from 'next'
import Link from 'next/link'

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/list')
  const posts = await res.json()
  return {
    props: {
      list: posts.data.list
    }, // will be passed to the page component as props
  }
}

const list: NextPage<any> = ({ list }) => {


  return (
    <div>
      {
        list.map((ele: any) => (
          <Link key={ele.id} href={`/ssg/${ele.name}`}>
            <h1 >{ele.name}</h1>
          </Link>
        ))
      }
    </div>
  )
}

export default list