var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  	.filter(function(x) {
   		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
});

// Really should make work for scoped modules
nodeModules['@terrencecrowley/ot-js'] = 'commonjs @terrencecrowley/ot-js';

var serverConfig = {
	entry: './src/server.ts',
	target: 'node',
	output: {
		path: __dirname + '/dist',
		filename: 'shareserver.bundle.js'
	},
	externals: nodeModules,

	// Enable source maps
	devtool: "source-map",

	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},

	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.js$/, enforce: "pre", loader: "source-map-loader" }
		]
	}
};

module.exports = [ serverConfig ];
