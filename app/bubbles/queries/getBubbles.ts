import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetBubblesInput
  extends Pick<Prisma.BubbleFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBubblesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: bubbles,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.bubble.count({ where }),
      query: (paginateArgs) => db.bubble.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      bubbles,
      nextPage,
      hasMore,
      count,
    }
  }
)
