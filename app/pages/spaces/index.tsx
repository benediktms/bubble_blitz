import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSpaces from "app/spaces/queries/getSpaces"

const ITEMS_PER_PAGE = 100

export const SpacesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ spaces, hasMore }] = usePaginatedQuery(getSpaces, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {spaces.map((space) => (
          <li key={space.id}>
            <Link href={Routes.ShowSpacePage({ spaceId: space.id })}>
              <a>{space.name}</a>
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

const SpacesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Spaces</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSpacePage()}>
            <a>Create Space</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SpacesList />
        </Suspense>
      </div>
    </>
  )
}

SpacesPage.authenticate = true
SpacesPage.getLayout = (page) => <Layout>{page}</Layout>

export default SpacesPage
