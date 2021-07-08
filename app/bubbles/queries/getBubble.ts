import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetBubble = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBubble), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bubble = await db.bubble.findFirst({ where: { id } })

  if (!bubble) throw new NotFoundError()

  return bubble
})
