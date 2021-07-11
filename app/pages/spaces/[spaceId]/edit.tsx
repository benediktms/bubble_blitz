import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSpace from "app/spaces/queries/getSpace"
import updateSpace from "app/spaces/mutations/updateSpace"
import { SpaceForm, FORM_ERROR } from "app/spaces/components/SpaceForm"

export const EditSpace = () => {
  const router = useRouter()
  const spaceId = useParam("spaceId", "number")
  const [space, { setQueryData }] = useQuery(
    getSpace,
    { id: spaceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSpaceMutation] = useMutation(updateSpace)

  return (
    <>
      <Head>
        <title>Edit Space {space.id}</title>
      </Head>

      <div>
        <h1>Edit Space {space.id}</h1>
        <pre>{JSON.stringify(space)}</pre>

        <SpaceForm
          submitText="Update Space"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSpace}
          initialValues={space}
          onSubmit={async (values) => {
            try {
              const updated = await updateSpaceMutation({
                id: space.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowSpacePage({ spaceId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditSpacePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSpace />
      </Suspense>

      <p>
        <Link href={Routes.SpacesPage()}>
          <a>Spaces</a>
        </Link>
      </p>
    </div>
  )
}

EditSpacePage.authenticate = true
EditSpacePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSpacePage
