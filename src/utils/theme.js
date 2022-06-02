export const darkColors = {
	background: "#060a10",
	color: "#ffffff",
};
export const lightColors = {
	background: "#eff0f2",
	color: "#090b16",
};

export const isDarkTheme =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: Dark)").matches;
