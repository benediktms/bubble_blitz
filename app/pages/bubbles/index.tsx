import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBubbles from "app/bubbles/queries/getBubbles"

const ITEMS_PER_PAGE = 100

export const BubblesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ bubbles, hasMore }] = usePaginatedQuery(getBubbles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {bubbles.map((bubble) => (
          <li key={bubble.id}>
            <Link href={Routes.ShowBubblePage({ bubbleId: bubble.id })}>
              <a>{bubble.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const BubblesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Bubbles</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewBubblePage()}>
            <a>Create Bubble</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <BubblesList />
        </Suspense>
      </div>
    </>
  )
}

BubblesPage.authenticate = true
BubblesPage.getLayout = (page) => <Layout>{page}</Layout>

export default BubblesPage
