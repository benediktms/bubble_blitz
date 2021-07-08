import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBubble from "app/bubbles/queries/getBubble"
import updateBubble from "app/bubbles/mutations/updateBubble"
import { BubbleForm, FORM_ERROR } from "app/bubbles/components/BubbleForm"

export const EditBubble = () => {
  const router = useRouter()
  const bubbleId = useParam("bubbleId", "number")
  const [bubble, { setQueryData }] = useQuery(
    getBubble,
    { id: bubbleId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBubbleMutation] = useMutation(updateBubble)

  return (
    <>
      <Head>
        <title>Edit Bubble {bubble.id}</title>
      </Head>

      <div>
        <h1>Edit Bubble {bubble.id}</h1>
        <pre>{JSON.stringify(bubble)}</pre>

        <BubbleForm
          submitText="Update Bubble"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBubble}
          initialValues={bubble}
          onSubmit={async (values) => {
            try {
              const updated = await updateBubbleMutation({
                id: bubble.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowBubblePage({ bubbleId: updated.id }))
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

const EditBubblePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBubble />
      </Suspense>

      <p>
        <Link href={Routes.BubblesPage()}>
          <a>Bubbles</a>
        </Link>
      </p>
    </div>
  )
}

EditBubblePage.authenticate = true
EditBubblePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBubblePage
