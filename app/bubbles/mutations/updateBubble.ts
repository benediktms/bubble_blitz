import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBubble = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBubble),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bubble = await db.bubble.update({ where: { id }, data })

    return bubble
  }
)
