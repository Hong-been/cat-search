export default class Component {
	constructor(target, props) {
		this.target = target;
		this.props = props;
		this.state = {};
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
		const template = document.createElement("template");
		template.innerHTML = this.template();
		// this.element = template.content.firstElementChild;
		this.element = this.target;
		this.target.innerHTML = this.template();
		// if (this.element) this.target.appendChild(this.element);
		// else this.element = this.target;

		this.componentDidMount();
	}
}
