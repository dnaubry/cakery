module.exports = {
    entry: {
        App: "./scripts/main.js"
    },
    output: {
        path: "./",
        filename: "main.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}
