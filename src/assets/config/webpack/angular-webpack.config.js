module.exports = {
  externals: { RunnerConfiguration: 'RunnerConfiguration' },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
