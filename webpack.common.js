const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node-modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: { minimize: true }
				}
			},
			{
				test: /\.(png|jpg|gif|jpeg|ttf|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [' ', '.js', '.jsx']
	},
	output: {
		publicPath: '/',
		filename: '[name].[hash].js'
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
			favicon: './src/favicon.ico'
		})
	]
}
