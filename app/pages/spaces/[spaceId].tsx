import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSpace from "app/spaces/queries/getSpace"
import deleteSpace from "app/spaces/mutations/deleteSpace"

export const Space = () => {
  const router = useRouter()
  const spaceId = useParam("spaceId", "number")
  const [deleteSpaceMutation] = useMutation(deleteSpace)
  const [space] = useQuery(getSpace, { id: spaceId })

  return (
    <>
      <Head>
        <title>Space {space.id}</title>
      </Head>

      <div>
        <h1>Space {space.id}</h1>
        <pre>{JSON.stringify(space, null, 2)}</pre>

        <Link href={Routes.EditSpacePage({ spaceId: space.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSpaceMutation({ id: space.id })
              router.push(Routes.SpacesPage())
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

const ShowSpacePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.SpacesPage()}>
          <a>Spaces</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Space />
      </Suspense>
    </div>
  )
}

ShowSpacePage.authenticate = true
ShowSpacePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSpacePage
