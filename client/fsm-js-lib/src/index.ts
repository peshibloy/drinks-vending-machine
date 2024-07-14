interface states {
	[key: string]: {
		on: {
			[event: string]: string;
		};
	};
}

interface FSMConfig {
	default: string;
	states: states;
}

class FSM {
	private states: states;
	private currState: string;

	constructor(config: FSMConfig) {
		this.states = config.states;
		this.currState = config.default;
	}

	transition(event: string): void {
		const nextState = this.states[this.currState].on[event];
		if (nextState) {
			this.currState = nextState;
		} else {
			throw new Error(`Invalid transition: cannot move from state ${this.currState} on ${event}`);
		}
	}

	get state(): string {
		return this.currState;
	}
}

export default FSM;
