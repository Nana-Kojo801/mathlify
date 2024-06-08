import { browser } from '$app/environment';

class OnlineStore {
	online = $state<boolean>(true);
}

export const onlineStore = new OnlineStore();
