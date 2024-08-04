const path = require('path');
const webpack = require('webpack');

const lazyImports = [
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
  'class-validator',
  'class-transformer',
  'amqplib',
  'amqp-connection-manager',
  'nats',
  'kafkajs',
  'mqtt',
  'ioredis',
  '@grpc/proto-loader',
  '@grpc/grpc-js',
  '@nestjs/platform-socket.io'
];

module.exports = function (options) {
  return {
    ...options,
    entry: ['./dist/src/main.js'],
    externals: [],
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist-compiled'),
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...(options.plugins || []),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          return lazyImports.includes(resource);
        },
      }),
    ],
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};

//const nodeExternals = require('webpack-node-externals');
//const webpack = require('webpack');

/*module.exports = {
  entry: './dist/src/main.js',  // Использование правильного пути к выходному файлу NestJS
  target: 'node',
  externals: [nodeExternals({
    allowlist: [/^@nestjs/]  // Включаем все пакеты @nestjs и rxjs
  })],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist-compiled'),  // Результаты Webpack в другую папку
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^@nestjs\/microservices$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@nestjs\/websockets$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^class-validator$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^class-transformer$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^amqplib$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^amqp-connection-manager$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^nats$/,
    }),

    new webpack.IgnorePlugin({
      resourceRegExp: /^kafkajs$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^mqtt$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^ioredis$/,
    }),

    new webpack.IgnorePlugin({
      resourceRegExp: /^@grpc\/proto-loader$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@grpc\/grpc-js$/,
    }),

    new webpack.IgnorePlugin({
      resourceRegExp: /^@nestjs\/platform-socket.io$/,
    }),
  ],
};*/

