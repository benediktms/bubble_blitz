import { resolver } from "blitz"
import db, { SpaceType } from "db"
import { z } from "zod"

const spaceTypeEnum = z.enum([SpaceType.FLAT, SpaceType.HOUSE, SpaceType.TRIP])

const CreateSpace = z.object({
  name: z.string(),
  type: spaceTypeEnum,
})

export default resolver.pipe(resolver.zod(CreateSpace), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const space = await db.space.create({ data: input })

  return space
})
