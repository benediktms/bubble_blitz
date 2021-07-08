import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBubble = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateBubble), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bubble = await db.bubble.create({ data: input })

  return bubble
})
