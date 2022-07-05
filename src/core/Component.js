export default class Component {
	constructor(target, props) {
		this.target = target;
		this.props = props;
		this.initialState();
	}

	initialState() {
		this.render();
	}

	setState(nextState) {
		this.state = {...this.state, ...nextState};
		console.log(`🫀 state: ${this.__proto__.constructor.name}`, this.state);
		this.render();
	}

	componentDidMount() {}

	template() {
		return ``;
	}

	render() {
		console.log(`✨ Render: ${this.__proto__.constructor.name}`);
		this.element = this.target;
		this.target.innerHTML = this.template();

		this.componentDidMount();
	}
}
