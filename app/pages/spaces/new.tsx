import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSpace from "app/spaces/mutations/createSpace"
import { SpaceForm, FORM_ERROR } from "app/spaces/components/SpaceForm"

const NewSpacePage: BlitzPage = () => {
  const router = useRouter()
  const [createSpaceMutation] = useMutation(createSpace)

  return (
    <div>
      <h1>Create New Space</h1>

      <SpaceForm
        submitText="Create Space"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSpace}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const space = await createSpaceMutation(values)
            router.push(Routes.ShowSpacePage({ spaceId: space.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.SpacesPage()}>
          <a>Spaces</a>
        </Link>
      </p>
    </div>
  )
}

NewSpacePage.authenticate = true
NewSpacePage.getLayout = (page) => <Layout title={"Create New Space"}>{page}</Layout>

export default NewSpacePage
