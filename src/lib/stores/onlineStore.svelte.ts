import { browser } from '$app/environment';

class OnlineStore {
	online = $state<boolean>(true);

	constructor() {
		if (browser) {
			window.addEventListener('offline', () => {
				this.online = false;
			});
			window.addEventListener('online', () => {
				this.online = true;
			});
		}
	}
}

export const onlineStore = new OnlineStore();
