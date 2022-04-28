const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "./public"),
		filename: "./main.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/i, // Regex fichiers javascript
				exclude: /node_modules/, // exclusion du répertoire node_modules
				use: {
					loader: 'babel-loader', // lance le loader babel
				}
			},
			{
				test: /\.(png|jpg|svg|gif)$/i, // Regex fichiers images
				exclude: /node_modules/, // exclusion du répertoire node_modules
				use: [
					'file-loader', // lance le file-loader
				]
			},
			{
				test: /\.scss$/i, // regex fichiers scss
				exclude: /node_modules/, // exclusion du répertoire node_modules
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader', // lance loader css
					'sass-loader', // lance loader sass
				]
			},
			{
				test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: {
					or: [
						/node_modules/,
						path.resolve(__dirname, 'src/images')
					]
				},
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		})
	]
};
