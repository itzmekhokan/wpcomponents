const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const DependencyExtractionPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		clean: true,
		filename: 'index.js',
		library: {
			name: 'itzmekhokan-wpcomponents',
			type: 'umd',
		},
		path: path.resolve( __dirname, 'dist' ),
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: require.resolve( 'babel-loader' ),
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				terserOptions: {
					format: {
						ascii_only: true,
						comments: false,
					},
				},
			} ),
		],
		usedExports: false,
	},
	plugins: [
		new DependencyExtractionPlugin(),
	],
	stats: {
		preset: 'summary',
		assets: true,
		colors: true,
		errors: true,
		warnings: true,
	},
};