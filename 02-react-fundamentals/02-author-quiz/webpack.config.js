module.exports = {
    entry: [
        './src/script.jsx'
    ],

    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
                presets: ['react', 'es2015']
            }
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    devServer: {
        historyApiFallback: true,
        contentBase: './',
        inline: true,
        port: 8080
    }
};