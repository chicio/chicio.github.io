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
  webpackFinal: async config => {
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
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
