import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBubble from "app/bubbles/queries/getBubble"
import deleteBubble from "app/bubbles/mutations/deleteBubble"

export const Bubble = () => {
  const router = useRouter()
  const bubbleId = useParam("bubbleId", "number")
  const [deleteBubbleMutation] = useMutation(deleteBubble)
  const [bubble] = useQuery(getBubble, { id: bubbleId })

  return (
    <>
      <Head>
        <title>Bubble {bubble.id}</title>
      </Head>

      <div>
        <h1>Bubble {bubble.id}</h1>
        <pre>{JSON.stringify(bubble, null, 2)}</pre>

        <Link href={Routes.EditBubblePage({ bubbleId: bubble.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBubbleMutation({ id: bubble.id })
              router.push(Routes.BubblesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowBubblePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.BubblesPage()}>
          <a>Bubbles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Bubble />
      </Suspense>
    </div>
  )
}

ShowBubblePage.authenticate = true
ShowBubblePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBubblePage
