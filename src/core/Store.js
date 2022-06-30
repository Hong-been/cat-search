export default class Store {
	constructor(initState) {
		this.observers = [];
		this.state = initState;
	}

	setState(nextState) {
		this.state = {...this.state, ...nextState};
		console.log(`💝 store `, this.state);
		this.notify();
	}

	subscribe(func) {
		this.observers.push(func);
	}

	unsubscribe(func) {
		this.observers = this.observers.filter((observer) => observer !== func);
	}

	notify() {
		this.observers.forEach((observer) => observer());
	}
}
