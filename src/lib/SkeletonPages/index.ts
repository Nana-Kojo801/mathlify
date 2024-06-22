import Marathon from "./Marathon.svelte";
import LeaderBoard from "./LeaderBoard.svelte";
import Home from "./Home.svelte";
import Levels from "./Levels.svelte";
import Practice from "./Practice.svelte";
import EditProfile from "./EditProfile.svelte";
import Profile from "./Profile.svelte";

export const Pages = (url: string): unknown => {
    const pages: {[key: string]: unknown} = {
        "/": Home,
        "/marathon": Marathon,
        "/leaderboard": LeaderBoard,
        "/levels": Levels,
        "/practice": Practice,
        "/profile/edit": EditProfile,
        "/profile": Profile
    }
    return pages[url]
}