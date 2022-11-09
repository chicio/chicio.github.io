const webpack = require('webpack');

module.exports = {
  stories: [
    "../__stories__/**/*.stories.mdx",
    "../__stories__/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  core: {
    builder: "webpack5",
  },
  typescript: {
    reactDocgen: false
  },
  webpackFinal: async config => {
    // To load react without having the jsx runtime issues
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      })
    );
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // Remove core-js to prevent issues with Storybook
    config.module.rules[0].exclude= [/core-js/]
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]
    config.resolve.mainFields = ["browser", "module", "main"];
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          require.resolve("@babel/plugin-proposal-class-properties"),
          require.resolve("@babel/plugin-proposal-private-methods"), /** https://github.com/babel/babel/issues/11622#issuecomment-638609015 **/
          require.resolve("@babel/plugin-proposal-private-property-in-object"), /** https://github.com/babel/babel/issues/11622#issuecomment-638609015 **/
          /** https://github.com/gatsbyjs/gatsby/issues/26099 **/
          [require.resolve("babel-plugin-remove-graphql-queries"), {
            stage: "develop-html",
            staticQueryDir: "page-data/sq/d",
          }],
        ],
      },
    })

    config.module.rules[0].use[0].options.plugins.push(
      require.resolve("babel-plugin-remove-graphql-queries")
    )
    return config
  },
}
