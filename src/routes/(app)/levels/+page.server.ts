
import type { PageServerLoad } from "../$types";
export const load: PageServerLoad = async ({ parent, depends }) => {
	const {user} = await parent()
	return { user };
};