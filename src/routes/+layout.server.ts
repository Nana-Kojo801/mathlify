import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { user }, depends }) => {
  depends("appwrite:auth")
  return {
    user,
  }
}