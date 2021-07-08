import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteBubble = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteBubble), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bubble = await db.bubble.deleteMany({ where: { id } })

  return bubble
})
