import { browser } from '$app/environment';

class OnlineStore {
	online = $state<boolean>(true);

	constructor() {
		if (browser) {
			window.addEventListener('offline', this.onlineHandler);
			window.addEventListener('online', this.offlineHandler);
		}
	}

	onlineHandler() {
		this.online = false
	}

	offlineHandler() {
		this.online = true
	}
}

export const onlineStore = new OnlineStore();
