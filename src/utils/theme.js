class Theme {
	constructor() {
		this.darkColors = {
			background: "#060a10",
			color: "#ffffff",
		};
		this.lightColors = {
			background: "#eff0f2",
			color: "#090b16",
		};
		this.init();
	}

	init = () => {
		const isDark = this.isDarkTheme();
		isDark ? this.toggleToTheme("dark") : this.toggleToTheme("light");
	};

	isDarkTheme = () => {
		return (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: Dark)").matches
		);
	};

	toggleToTheme = (theme) => {
		const themeColors = theme === "dark" ? this.darkColors : this.lightColors;

		for (const [key, value] of Object.entries(themeColors)) {
			document.querySelector(":root").style.setProperty(`--${key}`, `${value}`);
		}
	};
}

export default new Theme();
