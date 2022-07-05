const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/main.js",
		preload: "./src/preload.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve("./dist"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"],
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
