const path = require('path');

module.exports = {
    entry: './Taigon/frontend/src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'Taigon/frontend/static'),
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
        ]
      }
};