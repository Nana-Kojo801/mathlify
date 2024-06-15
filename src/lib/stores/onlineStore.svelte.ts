import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';

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
		invalidateAll()
	}

	offlineHandler() {
		this.online = true
		invalidateAll()
	}
}

export const onlineStore = new OnlineStore();
