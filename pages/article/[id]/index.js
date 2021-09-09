import { server } from '../../../config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Meta from '../../../components/Meta'

const article = ({ article }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const { id } = router.query

  return (
    <>
    this is an article
      <Meta title={article.title} description={article.excerpt} />
      {/* <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br /> */}
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br /> 
      <Link href='/'>Go Back</Link>
    </>
  )
}

// great for fetching data every time the page loads
// export const getServerSideProps = async (context) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
//     const article = await res.json()

//     return {
//         props: {
//             article,
//         }
//     }
// }

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`)

  const article = await res.json()

  return {
    props: {
      article,
    },
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`)

  const articles = await res.json()

  const ids = articles.map((article) => article.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}

// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   )

//   const article = await res.json()

//   return {
//     props: {
//       article,
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

//   const articles = await res.json()

//   const ids = articles.map((article) => article.id)
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }))

//   return {
//     paths,
//     fallback: false, // if we go to something that doesn;t exist it will return a 404 page
//   }
// }

export default article