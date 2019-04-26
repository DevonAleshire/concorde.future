var path = require('path');
var entries = require('./webpack.config.entries.js');

function srcPath(subdir) {
    return path.join(__dirname, "scripts", subdir);
}

module.exports = function (env, argv) {
    env = env || {}
    return {
        entry: entries(),
        output: {
            filename: function (chunkData) { return chunkData.chunk.name.replace(/\-/g, '/') + '.js'},
            path: path.resolve(__dirname, 'wwwroot/js/'),
            library: 'Page'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                '@services' : srcPath('services'),
            }
        },
        mode: env.prod ? 'production' : 'development',
        devtool: env.prod ? false : 'source-map'
    }
};