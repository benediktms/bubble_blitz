import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createBubble from "app/bubbles/mutations/createBubble"
import { BubbleForm, FORM_ERROR } from "app/bubbles/components/BubbleForm"

const NewBubblePage: BlitzPage = () => {
  const router = useRouter()
  const [createBubbleMutation] = useMutation(createBubble)

  return (
    <div>
      <h1>Create New Bubble</h1>

      <BubbleForm
        submitText="Create Bubble"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBubble}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const bubble = await createBubbleMutation(values)
            router.push(Routes.ShowBubblePage({ bubbleId: bubble.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.BubblesPage()}>
          <a>Bubbles</a>
        </Link>
      </p>
    </div>
  )
}

NewBubblePage.authenticate = true
NewBubblePage.getLayout = (page) => <Layout title={"Create New Bubble"}>{page}</Layout>

export default NewBubblePage
