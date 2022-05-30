import {isDarkTheme} from "../utils/theme.js";
import {darkColors, lightColors} from "../utils/theme.js";

export default class ThemeButton {
	constructor({$target}) {
		const $themeToggle = document.createElement("button");
		this.$themeToggle = $themeToggle;

		$target.insertAdjacentElement("afterbegin", $themeToggle);

		$themeToggle.addEventListener("click", () => this.setState(!this.state));
		this.setState(isDarkTheme);
	}
	setState(newState) {
		this.state = newState;
		this.render();
	}

	render() {
		const message = this.state ? "라이트모드 |" : "다크모드 |";
		this.$themeToggle.innerText = message;

		if (this.state) {
			for (const [key, value] of Object.entries(darkColors)) {
				document.documentElement.style.setProperty(`--${key}`, `${value}`);
			}
		} else {
			for (const [key, value] of Object.entries(lightColors)) {
				document.documentElement.style.setProperty(`--${key}`, `${value}`);
			}
		}
	}
}
