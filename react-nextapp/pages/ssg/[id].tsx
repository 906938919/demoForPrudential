import { NextPage } from 'next'

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/list')
  const posts = await res.json()

  return {
    paths: posts.data.list.map((ele: any) => ({ params: { id: ele.name } })),
    fallback: true // false or 'blocking'
  };
}

export async function getStaticProps({ params }: any) {
  console.log(params);

  const res = await fetch(`http://localhost:3000/api/info?name=${params.id}`)
  const posts = await res.json()
  return {
    props: {
      info: posts.data.info
    }, // will be passed to the page component as props
  }
}

const info: NextPage<any> = ({ info }) => {


  return (
    <div>
      {info.name}
    </div>
  )
}

export default info